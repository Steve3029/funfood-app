import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LoginModal } from './';

const styles = theme => ({
  buttonItem: {
    margin: theme.spacing.unit,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  paperWidthSm: {
    maxWidth: '500px',
  },
});

export class Identity extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      displayRegisterForm: false,
      displayLoginForm: false,
    };
  }

  handleSignUp = () => {
    this.setState({
      displayRegisterForm: true,
      openModal: true,
    });
  };

  handleSignIn = () => {
    this.setState({
      openModal: true,
      displayLoginForm: true,
    });
  }

  handleClose = () => {
    this.setState({ 
      openModal: false,
      displayLoginForm: false,
      displayRegisterForm: false, 
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button color="inherit" className={classes.buttonItem} onClick={this.handleSignIn}>
          SignIn
        </Button>
        <Button color="inherit" className={classes.buttonItem} onClick={this.handleSignUp}>
          SignUp
        </Button>
        {this.state.openModal && 
          this.state.displayRegisterForm && 
          <LoginModal 
            openModal={this.state.openModal} 
            modalType="signup" 
            handleClose={this.handleClose}
          />}

          {this.state.openModal && 
            this.state.displayLoginForm && 
            <LoginModal 
              openModal={this.state.openModal} 
              modalType="signin" 
              handleClose={this.handleClose} 
            />}
      </div>
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Identity));
