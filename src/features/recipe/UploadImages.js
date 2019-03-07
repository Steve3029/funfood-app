import React, { Component } from 'react';
import axios from 'axios';
import { InputLabel, CircularProgress, FormHelperText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import HighlightOff from '@material-ui/icons/HighlightOff';
import classNames from 'classnames';
import { string } from 'prop-types';

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
  }
});

function UploadButton(props) {
  const { classes, onChange } = props;
  return (
    <div>
      <InputLabel htmlFor="single">
        <AddAPhoto className={classNames(classes.bigIcon, classes.iconCursor)} />
        <p>Add a Phone</p>
      </InputLabel>
      <input hidden type="file" id="single" onChange={onChange} />
    </div>
  );
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

class UploadImages extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {
      uploading: false,
      removing: false,
      image: null
    }
  }

  onChange = event => {
    const errs = [];
    const file = Array.from(event.target.files);
    // multiple images upload is not allowed
    if (file.length > 1) {
      errs.push("Only 1 image can be uploaded at a time.");
    }
    const image = file[0];
    // only support png, jpeg, gif image
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    if (types.every(type => image.type !== type)) {
      errs.push(`${image.type} is not a support format.`)
    }

    // the size of image is limited
    if (image.size > 150000) {
      errs.push(`${image.name} is too large, please pick a smaller image`);
    }

    // if errors is not empty popup errors info
    if (errs.length > 0) {
      // popup errors info
    } else {
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
          // popup err message

        }
      );

    }
  }

  removeImage = id => {
    if (id == null || id === "")
      return;
    
    id = encodeURIComponent(id);
    const requestPath = "https://localhost:5001/api/v1/images/destroy?desc=" + id;
    console.log(requestPath);
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
        // popup error message
      }
    );
  }

  render() {
    const { uploading, removing, image } = this.state;
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
      </div>
    );
  }
}

export default withStyles(styles)(UploadImages);