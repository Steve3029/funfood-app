import React, { Component } from 'react';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import MessageDialog from './MessageDialogFrame';
import ImagePreview from './ImageUploadPreview';
import UploadButton from './ImageUploadButton';

const styles = theme => ({
  root: {
    width: "100%",
    border: "1px dashed",
    borderRadius: "4px",
    textAlign: "center",
    marginBottom: theme.spacing.unit * 4,
  },
  buttonProgress: {
    color: green[500],
    marginTop: 61,
  },
});

// Messages of image format errors
const imageQuantityError = "Only 1 image can be uploaded at a time.";
const imageFormatError = "The types of image that can be supported only include GIF, PNG and JPG.";
const imageSizeError = "The size of the image is too large, please pick a smaller image";
const imageUploadError = "Uploading of image has failed.";
const imageRemoveError = "Removing of image has failed.";

class UploadImages extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      removing: false,
      open: false,
      error: "",
      image: null
    }
  }

  onChange = event => {
    const file = Array.from(event.target.files);
    // multiple images upload is not allowed
    if (file.length > 1) {
      this.handleShowErrMsgModal(imageQuantityError);
      return;
    }
    const image = file[0];
    // only support png, jpeg, gif image
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    if (types.every(type => image.type !== type)) {
      this.handleShowErrMsgModal(imageFormatError);
      return;
    }

    // the size of image is limited
    if (image.size > 150000) {
      this.handleShowErrMsgModal(imageSizeError);
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
        this.props.index ?
          this.props.callBack(res.data.secure_url, this.props.index) :
          this.props.callBack(res.data.secure_url);
      },

      (err) => {
        this.setState({ uploading: false });
        this.handleShowErrMsgModal(imageUploadError);
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
        });
        this.props.index ?
          this.props.callBack(null, this.props.index) :
          this.props.callBack(null);
      },

      (errs) => {
        this.setState({
          removing: false
        });
        this.handleShowErrMsgModal(imageRemoveError);
      }
    );
  }

  handleShowErrMsgModal = (errorMsg) => {
    this.setState({
      error: errorMsg,
      open: true,
    })
  }

  handleCloseErrMsgModal = () => {
    this.setState({
      open: false,
      error: "",
    });
  };

  render() {
    const { uploading, removing, image, error, open } = this.state;
    const { classes, idName, size } = this.props;
    const content = () => {
      switch (true) {
        case removing:
        case uploading:
          return <CircularProgress size={64} className={classes.buttonProgress} />
        case image != null:
          return <ImagePreview idName={idName} classes={classes} imgSize={size} image={image} removeImage={this.removeImage} />
        default:
          return <UploadButton idName={idName} classes={classes} onChange={this.onChange} />
      }
    }

    return (
      <div key={idName} className={classes.root}>
        {content()}
        <MessageDialog
          openModal={open}
          message={error}
          handleClose={this.handleCloseErrMsgModal}
        />
      </div>
    );
  }
}

export default withStyles(styles)(UploadImages);