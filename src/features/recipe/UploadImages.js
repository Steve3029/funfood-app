import React, { Component } from 'react';
import axios from 'axios';
import { InputLabel, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import HighlightOff from '@material-ui/icons/HighlightOff';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';

const styles = theme => ({
  bigIcon: {
    fontSize: 128,
  },
  normalIcon: {
    fontSize: 32,
  },
  iconCursor: {
    cursor: "pointer",
  },
  root: {
    width: "100%",
    border: "1px solid",
    borderRadius: "4px",
    textAlign: "center",
    marginBottom: theme.spacing.unit * 4,
  },
  buttonProgress: {
    color: green[500],
    marginTop: 61,
  },
  delete: {
    position: "relative",
    top: 5,
    left: 5,
    float: "left",
  },
  img: {
    maxWidth: 834,
    maxHeight: 834,
    padding: 2,
  },
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
    backgroundColor: theme.palette.error.dark,
  }
});

function UploadButton(props) {
  const { classes, onChange } = props;
  return (
    <div>
      <InputLabel htmlFor="single">
        <AddAPhoto className={classNames(classes.bigIcon, classes.iconCursor)} />
        <p>Add a Photo</p>
      </InputLabel>
      <input hidden type="file" id="single" onChange={onChange} />
    </div>
  );
}

UploadButton.propTypes = {
  onChange: PropTypes.func,
}

function ImagePreview (props) {
  const { classes, removeImage, image } = props;
  return (
    <div>
      <div className={classes.delete} 
        onClick={() => removeImage(image.public_id)}
      >
        <HighlightOff className={classes.normalIcon} color="secondary" />
      </div>
      <img className={classes.img} src={image.secure_url} alt=""/>
    </div>
  );
}

ImagePreview.propTypes = {
  removeImage: PropTypes.func,
  image: PropTypes.object,
}

// Messages of image format errors
const imageQuantityError = "Only 1 image can be uploaded at a time.";
const imageFormatError = "The types of image that can be supported only include GIF, PNG and JPG.";
const imageSizeError = "The size of the image is too large, please pick a smaller image";

class UploadImages extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {
      uploading: false,
      removing: false,
      open: false,
      error: "",
      image: null
    }
  }

  showErrorMessage = (errorMsg) => {
    this.setState({
      error: errorMsg,
      open: true,
    })
  }

  onChange = event => {
    const file = Array.from(event.target.files);
    // multiple images upload is not allowed
    if (file.length > 1) {
      this.showErrorMessage(imageQuantityError);
      return;
    }
    const image = file[0];
    // only support png, jpeg, gif image
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    if (types.every(type => image.type !== type)) {
      this.showErrorMessage(imageFormatError);
      return;
    }

    // the size of image is limited
    if (image.size > 150000) {
      this.showErrorMessage(imageSizeError);
      return;
    }

    
    const formData = new FormData();
    formData.append("image", image);
    this.setState({ uploading: true });
    const doRequest = axios.post("https://localhost:5001/api/v1/images/upload", formData);
    doRequest.then(
      (res) => {
        this.setState({ 
          uploading: false,
          image: res.data,
          });
      },

      (err) => {
        this.setState({ uploading: false });
        this.showErrorMessage(err.response.data);
      }
    );
  }

  removeImage = id => {
    if (id == null || id === "")
      return;
    
    const requestPath = "https://localhost:5001/api/v1/images/destroy?desc=" + id;
    const doRequest = axios.get(requestPath);
    this.setState({ removing: true });
    doRequest.then(
      (res) => {
        this.setState({
          removing: false,
          image: null
        })
      },

      (errs) => {
        this.setState({
          removing: false
        });
        this.showErrorMessage(errs.response.data);
      }
    );
  }

  handleNoticeClose = () => {
    this.setState({ 
      open: false,
      error: "",
    });
  };

  render() {
    const { uploading, removing, image, error, open } = this.state;
    const { classes } = this.props;
    const content = () => {
      switch(true) {
        case removing:
        case uploading:
          return <CircularProgress size={64} className={classes.buttonProgress} />
        case image != null:
          return <ImagePreview classes={classes} image={image} removeImage={this.removeImage} />
        default:
          return <UploadButton classes={classes} onChange={this.onChange} />
      }
    }

    return (
      <div className={classes.root}>
        {content()}
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={this.handleNoticeClose}
            ContentProps={{
              'aria-describedby': 'snackbar-fab-message-id',
              className: classes.snackbarContent,
            }}
            message={<span id="snackbar-fab-message-id">{error}</span>}
            className={classes.snackbar}
          />
      </div>
    );
  }
}

export default withStyles(styles)(UploadImages);