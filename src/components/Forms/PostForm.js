import React from 'react'
import { connect } from 'react-redux'
import { postExperience, register } from '../../actions/actions'
import {  Form, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import './Post.css'

class PostExperience extends React.Component {
  state = { 
      user_id: this.props.registeredUser.id,        
      title: "",
      date: "",
      location: "",
      price: "",
      description: ""
    }
  

    handleChange = e => {
      e.preventDefault()
      this.setState({ [e.target.name]: e.target.value })
    }
  
  
    postExperienceHandler = (e)=> {
      e.preventDefault()
      const { user_id, title, date, location, price, description } = this.state
      this.props.postExperience({ user_id, title, date, location, price, description})
      this.setState({ 
        user_id: "",  
        title: "",
        date: "",
        location: "",
        price: "",
        description: "" 
      });
      this.props.history.push('/dashboard')
    }


render() {
  return (
   <div className='post-page'>
     <div className='post-wrapper'>
     <h1 className='post-form-header'>Let's add an experience!</h1>
    <Form className='post-form' onSubmit={this.postExperienceHandler}>
      <Input
        className='post-input'
        type='text'
        name='title'
        placeholder='Title'
        required
        value={this.state.title}
        onChange={this.handleChange}
      />
      <Input
        className='post-input'
        type='date'
        name='date'
        placeholder='Date'
        required
        value={this.state.date}
        onChange={this.handleChange}
      />
      <Input
        className='post-input'
        type='text'
        name='location'
        required
        placeholder='Location'
        value={this.state.location}
        onChange={this.handleChange}
      />
      <Input
        className='post-input'
        type='number'
        name='price'
        placeholder='Price'
        value={this.state.price}
        onChange={this.handleChange}
      />
      <Input
        className='post-input'
        type='textarea'
        name='description'
        placeholder='Description'
        value={this.state.description}
        onChange={this.handleChange}
      />
       <button className='btn-post btn btn-primary'>
         {this.props.isLoggingIn ? 'Loading' : 'Share'}
       </button>
       <p><Link to='/dashboard'>Go back</Link></p>
    </Form>
    </div>
   </div>
   )
  }
}

const mapStateToProps = state => {
  return {
    registeredUser: state.registeredUser,
    postingExperience: state.postingExperience,
    error: state.error,
  }
}

export default connect(
  mapStateToProps,
  { postExperience, register}
)(PostExperience)

