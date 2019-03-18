import React from 'react';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  normalIcon: {
    fontSize: 32,
  },
  delete: {
    position: "relative",
    top: 5,
    left: 5,
    float: "left",
  },
  bigImg: {
    maxWidth: 834,
    maxHeight: 834,
    padding: 2,
  },
  smallImg: {
    maxWidth: 272,
    maxHeight: 133,
    padding: 1,
  }
});

function ImagePreview(props) {
  const { classes, removeImage, image, idName, imgSize } = props;
  return (
  <div key={`view-${idName}`}>
    <div className={classes.delete} onClick={() => removeImage(image.public_id)}>
      <HighlightOff className={classes.normalIcon} color="secondary" />
    </div>
    <img className={imgSize === "big" ? classes.bigImg : classes.smallImg} src={image.secure_url} alt="" />
  </div>);
}

ImagePreview.propTypes = {
  removeImage: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImagePreview);
