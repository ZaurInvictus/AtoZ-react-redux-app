import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/actions';
import {  Form, Input } from 'reactstrap'
import './Login.css'

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
      this.props.login(this.state.credentials).then(() => {
      this.props.history.push('/dashboard');
    });
  };


render() {
  return (
   <div className='login-page'>
   <div className='form-wrapper'>
    {this.props.error && this.props.error} 
    <h1>Log In here</h1>
     <Form className='login-form' onSubmit={this.login}> 
          <Input 
            className='login-input'
            type="text" 
            name='username'
            id="text" 
            placeholder="Username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
           />
          <Input 
            className='login-input'
            type="password" 
            name="password" 
            id="examplePassword" 
            placeholder="Password" 
            value={this.state.credentials.password}
            onChange={this.handleChange}
           />

        <button type="submit" className="btn btn-login btn-primary">
          {this.props.isLoggingIn ? 'Loading' : 'Login'}
        </button>
        <p>Do not have an account yet?<Link to='/register'>Sign Up here!</Link></p>
      </Form>
      </div>
   </div>
   )
  }
}

const mapStateToProps = state => {
  return {
    isLoggingIn: state.isLoggingIn,
    error: state.error,
    loggedInUser: state.loggedInUser,
    loginMessage: state.loginMessage
  }
}

export default connect(
  mapStateToProps,
  { login }
)(Login)

