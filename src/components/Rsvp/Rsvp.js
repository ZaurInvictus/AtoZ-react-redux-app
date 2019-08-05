import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Alert } from 'reactstrap'
import { register, login, rsvpExperience, getExperiences } from '../../actions/actions';
import './Rsvp.css'




class RsvpExperience extends React.Component {
  state = {
    credentials: {
      user_id: '',
      experience_id: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.credentials)
  };

  rsvp = e => {
    e.preventDefault();
      this.props.rsvpExperience(this.state.credentials)
      .then(() => {
        if(this.props.rsvpError) {
          this.props.getExperiences()
        } else if(!this.props.rsvpError) {
          this.props.history.push('/dashboard');
        }
    });
  }


render() {
  return (
   <div className='rsvp-page'>
   <div className='rsvp-form-wrapper'>
    {this.props.rsvpError && <Alert color="danger" >{this.props.rsvpError}</Alert>}
    <h1 className='rsvp-form-header'>Rsvp to an experience!</h1>
    <p>Please add your Id and Id of the experience you want to Rsvp</p>
     <Form className='rsvp-form' onSubmit={this.rsvp}> 
          <Input 
            className='rsvp-input'
            type="text" 
            name='user_id'
            id="text" 
            placeholder="User Id"
            required
            value={this.state.credentials.user_id}
            onChange={this.handleChange}
           />
          <Input 
            className='rsvp-input'
            type="text" 
            name="experience_id" 
            id="examplePassword" 
            placeholder="Experience Id" 
            required
            value={this.state.credentials.experience_id}
            onChange={this.handleChange}
           />
        <button type="submit" className="btn btn-rsvp btn-primary">
          {this.props.isLoggingIn ? 'Loading' : 'RSVP'}
        </button>
         <p>Do not remember Id of the experience?<Link to='/dashboard'>Back</Link></p>
      </Form>
      </div>
   </div>
   )
  }
}

const mapStateToProps = state => {
  console.log('RSVP STATE', state)
  return {
    rsvpError: state.rsvpError,
    loggedInUser: state.loggedInUser,
    loginMessage: state.loginMessage
  }
}

export default connect(
  mapStateToProps,
  { register, login, rsvpExperience, getExperiences }
)(RsvpExperience)

