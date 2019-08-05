import React from 'react'
import { connect } from 'react-redux'
import { register } from '../../actions/actions';
import './Register.css'
import {Link} from 'react-router-dom'
import {  Form, Input } from 'reactstrap'

class Register extends React.Component {
  state = {
    credentials: {
      username:'',
      password: '',
      "first_name": '',
      "last_name":'',
      email: '',
      city: ''
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

  register = e => {
    e.preventDefault();
      this.props.register(this.state.credentials).then(() => {
      this.props.history.push('/dashboard');
    });
  };


render() {
  return (
  <div className='register-page'>
   <div className='form-wrapper'>
    {this.props.error && this.props.error} 
    <h1>Sign Up here</h1>
    <Form className='register-form' onSubmit={this.register}>
      <Input
        className='register-input'
        type='text'
        name='username'
        placeholder='Username'
        required
        value={this.state.credentials.username}
        onChange={this.handleChange}
      />
      <Input
        className='register-input'
        type='password'
        name='password'
        placeholder='Password'
        required
        value={this.state.credentials.password}
        onChange={this.handleChange}
      />
      <Input
        className='register-input'
        type='text'
        name='first_name'
        placeholder='First Name'
        value={this.state.credentials.first_name}
        onChange={this.handleChange}
      />
      <Input
        className='register-input'
        type='text'
        name='last_name'
        placeholder='Last Name'
        value={this.state.credentials.last_name}
        onChange={this.handleChange}
      />
      <Input
        className='register-input'
        type='email'
        name='email'
        placeholder='Email'
        value={this.state.credentials.email}
        onChange={this.handleChange}
      />
      <Input
        className='register-input'
        type='text'
        name='city'
        placeholder='City'
        value={this.state.credentials.city}
        onChange={this.handleChange}
      />
       <button className='btn-register btn btn-primary'>
          {this.props.registering ? 'Loading' : 'Sign Up'} 
       </button>
       <p>Already have an account?<Link to='/login'>Log In here!</Link></p>
    </Form>
   </div>
   </div>
   )
  }
}

const mapStateToProps = state => {
  return {
    registering: state.registering,
    error: state.error
  }
}

export default connect(
  mapStateToProps,
  { register }
)(Register)

