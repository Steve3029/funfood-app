import React from 'react';
import { InputLabel } from '@material-ui/core';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
  bigIcon: {
    fontSize: 128,
  },
  iconCursor: {
    cursor: "pointer",
  },
});

function UploadButton(props) {
  const { classes, onChange } = props;
  return (<div>
    <InputLabel htmlFor="single">
      <AddAPhoto className={classNames(classes.bigIcon, classes.iconCursor)} />
      <p>Add a Photo</p>
    </InputLabel>
    <input hidden type="file" id="single" onChange={onChange} />
  </div>);
}

UploadButton.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadButton);