import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, FormHelperText } from '@material-ui/core';
import * as yup from 'yup';
import { DialogTitle, DialogContent } from '../common/customizeDialogHelper';
import { Formik } from 'formik';
import FormGenerator from './FormGenerator';

// sign up validation schema
const signUpValidationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required!'),
  email: yup.string()
    .email('Email is not valid!')
    .required('Email is required as your unique account!'),
  password: yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!')
});

const signInValidationSchema = yup.object().shape({
  email: yup.string()
    .email('Email is not valid!')
    .required('Email is required as your unique account!'),
  password: yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!')
});

const styles = theme => ({
  paperWidthSm: {
    maxWidth: '500px',
  },
  formErrorContainer: {
    backgroundColor: theme.palette.error.dark,
    borderRadius: 3,
  },
  root: {
    marginBottom: theme.spacing.unit * 2,
    fontSize: 20,
    padding: 7,
    color: theme.palette.getContrastText(theme.palette.error.dark),
  },
});

export class LoginModal extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleSignUp = (values) => {
    this.props.actions.userSignUp(values);
  };

  handleSignIn = (values) => {
    this.props.actions.userSignIn(values);
  };

  handleClose = () => {
    this.props.handleClose();
    this.props.actions.dismissUserSignUpError();
    this.props.actions.dismissUserSignInError();
  };

  render() {
    const {
      openModal, // control modal hidding or display
      modalType, // indicates what type of dialog will be rendered: sign up or sign in 
      classes
    } = this.props;

    const errorMessage = modalType === "signup" ?
      this.props.home.userSignUpError :
      this.props.home.userSignInError;

    const handleSubmit = modalType === "signup" ? 
      this.handleSignUp : 
      this.handleSignIn;

    const validationSchema = modalType === "signup" ? 
      signUpValidationSchema : 
      signInValidationSchema;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose} />
        <DialogContent className={classes.paperWidthSm} >
          <div>
            {(this.props.home.userSignUpError || this.props.home.userSignInError)
              &&
              (<div className={classes.formErrorContainer}>
                <FormHelperText
                  id="form-error-message"
                  variant="filled"
                  margin="dense"
                  className={classes.root}
                >
                  {errorMessage}
                </FormHelperText>
              </div>)
            }
            <Formik
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              render={props => (<FormGenerator type={modalType} {...props} />)}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginModal));
