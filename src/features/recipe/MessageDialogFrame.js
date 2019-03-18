import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, withStyles } from '@material-ui/core';
import { DialogTitle, DialogContent } from '../common/customizeDialogHelper';

const styles = theme => ({
  paperWidthSm: {
    maxWidth: '450px',
  },
  msgFont: {
    fontSize: "28px",
    fontWeight: "300",
    textAlign: "center",
  },
  fieldMargin:{
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});

class MessageDialogFrame extends Component {
  static propTypes = {
    openModal: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  render() {
    const { classes, openModal, message, handleClose } = this.props;
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="Important-Message"
        open={openModal}
      >
        <DialogTitle id="Important-Message" onClose={handleClose} />
        <DialogContent className={classes.paperWidthSm} >
          <div>
            <span className={classes.msgFont}>
              {message}
            </span>
            <Button
              className={classes.fieldMargin}
              margin="dense"
              type="submit"
              fullWidth
              variant="text"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(MessageDialogFrame);