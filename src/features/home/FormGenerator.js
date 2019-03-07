import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import { AccountCircleOutlined, EmailOutlined, LockOutlined } from '@material-ui/icons';

const styles = theme => ({
  fieldMargin:{
    marginBottom: theme.spacing.unit * 3,
  },
});

function formGenerator(props) {
  
  const usernameField = 
    (<TextField 
      className={props.classes.fieldMargin} 
      margin="dense" 
      name="username" 
      label="Username" 
      type="text" 
      variant="outlined" 
      fullWidth 
      required 
      onChange={props.handleChange} 
      onBlur={props.handleBlur} 
      value={props.values.username} 
      helperText={props.touched.username ? props.errors.username : ""} 
      error={props.touched.username && Boolean(props.errors.username)} 
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <AccountCircleOutlined />
          </InputAdornment>
        ),
      }}
    />);

    const emailField = 
      (<TextField 
        className={props.classes.fieldMargin} 
        margin="dense" 
        name="email" 
        label="Email" 
        type="email"  
        variant="outlined"
        fullWidth 
        required 
        onChange={props.handleChange} 
        onBlur={props.handleBlur} 
        value={props.values.email} 
        helperText={props.touched.email ? props.errors.email : ""} 
        error={props.touched.email && Boolean(props.errors.email)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EmailOutlined />
            </InputAdornment>
          ),
        }}
      />);

    const passwordField = 
      (<TextField 
        className={props.classes.fieldMargin}         
        margin="dense"        
        name="password" 
        label="Password" 
        type="password" 
        variant="outlined" 
        fullWidth 
        required 
        onChange={props.handleChange} 
        onBlur={props.handleBlur} 
        value={props.values.password} 
        helperText={props.touched.password ? props.errors.password : ""}
        error={props.touched.password && Boolean(props.errors.password)} 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LockOutlined />
            </InputAdornment>
          ),
        }}
      />);
      
    const signupBtn = 
      (<Button 
        className={props.classes.fieldMargin}         
        margin="dense" 
        type="submit" 
        fullWidth 
        variant="text"
      >
        Sign Up
      </Button>);

    const signinBtn = 
      (<Button 
        className={props.classes.fieldMargin}         
        margin="dense" 
        type="submit" 
        fullWidth 
        variant="text"
      >
        Sign In
      </Button>
      );

    if (props.type === "signup") {
      return (
        <form onSubmit={props.handleSubmit}>
          {usernameField}
          {emailField}
          {passwordField}
          {signupBtn}
        </form>
      )
    } else {
      return (
        <form onSubmit={props.handleSubmit}>
          {emailField}
          {passwordField}
          {signinBtn}
        </form>
      )
    }
}

export default withStyles(styles)(formGenerator);