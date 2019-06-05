import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Cloud from '@material-ui/icons/Cloud';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { compareUsers } from '../utils';
import { fetchLogin } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import styles from '../styles';


class Login extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.state = {
      username: '',
      password: '',
      formErrors: {username: '', password: ''},
      usernameValid: false,
      passwordValid: false,
      formValid: false,
      user : props.user,
      isFetchingAuth : props.isFetchingAuth
    };

    this.doLogin = props.doLogin;
    this.onSuccess = props.onSuccess;
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.user && !compareUsers(nextProps.user, prevState.user)){
      return { 
        user: nextProps.user,
        isFetchingAuth: nextProps.isFetchingAuth 
      };
    }else if(nextProps.isFetchingAuth !== prevState.isFetchingAuth){
      return { isFetchingAuth: nextProps.isFetchingAuth };
    }
    return null;
  }


  handleSubmit(event) {
    event.preventDefault();
    const userData = {
      username : this.state.username,
      password : this.state.password
    };
    this.doLogin(userData);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'username':
        usernameValid = value.match(/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/i) && value.length >= 6;
        fieldValidationErrors.username = usernameValid ? '' : 'username is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': 'password is too short';
        break;
      default:
        break;
    }
    this.setState({ 
      formErrors: fieldValidationErrors,
      usernameValid: usernameValid,
      passwordValid: passwordValid
    },  this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
    const classes = this.props.classes;

    const ErrorMessage = ({ caption }) => {
      return (
      <Typography className={classes.errorMessage} variant="caption">
        {caption}
      </Typography>);
    };
    
    if(this.state.user)
      return <Redirect to="/home"/>;
    else if(this.state.isFetchingAuth) 
      return (
        <React.Fragment>
          <Container maxWidth="xs">
          <div className={classes.paper}>
            <CircularProgress size={200} className={classes.progress} />
          </div>
          </Container>
        </React.Fragment>
      );
    else return (
      <React.Fragment>
        <Container maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Cloud/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleUserInput} 
              autoComplete="username"
              autoFocus
            />
            { this.state.isFormValid ? '' : <ErrorMessage caption={this.state.formErrors.username}/>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={this.state.password}
              onChange={this.handleUserInput} 
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            { this.state.isFormValid ? '' : <ErrorMessage caption={this.state.formErrors.password}/>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!this.state.formValid}
            >
              Sign In
            </Button>
          </form>
        </div>
        </Container>
      </React.Fragment>
    );
  }
} 


const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (data) => {
        dispatch(fetchLogin(data));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    isFetchingAuth : state.auth.isFetchingLogin || state.auth.isFetchingInitialAuth,
    user : state.auth.loggedInUser
  }
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));