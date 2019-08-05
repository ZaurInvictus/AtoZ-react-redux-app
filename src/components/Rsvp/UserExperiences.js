import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {  getUserExperiences, register, login, getExperiences, postExperience, deleteExperience, updateExperience } from '../../actions/actions'
import { Jumbotron,  Alert, Card, Button, CardHeader, CardFooter, CardBody} from 'reactstrap'
// import './UserExperiences.css'
import { ClipLoader } from 'react-spinners'



class UserExperiences extends Component {
  state = {
    deletingExperience: null,
    editingExperienceId: null,
    filteredExperiences: [],
    modal: false
  };


  componentDidMount() {
    if(this.props.registeredUser) {
      this.props.getUserExperiences(this.props.registeredUser.id)
    } else if (this.props.loggedInUser) {
      this.props.getUserExperiences(this.props.loggedInUser.id)
    }
  }

deleteExperience = id => {
   this.props.deleteExperience(id).then(() => {
   this.setState({filteredExperiences: [], deletingExperienceId: id });
   this.props.getExperiences()
  })
}


  searchPostsHandler = e => {
    console.log(this.state)
    const exp = this.props.userExperiences.filter(curr => curr.title.includes(e.target.value));
    this.setState({ filteredExperiences: exp })
  };




  render() {
    if (this.props.fetchingExperiences) {
      return (
        <div className='sweet-loading'>
         <ClipLoader
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
         />
      </div>
      );
    }
    console.log(this.props)
     return(
          <div className='user-experiences-card-wrapper'>
             {this.props.userExperiences.map(exp => {
               return (
                <div className="experiences-card" key={exp.id}>
                <Card>
                  <CardHeader tag="h4">{exp.title}</CardHeader>
                  <CardBody>
                     <p><strong>Location:</strong>{exp.location}</p>
                     <p><strong>Date:</strong>{exp.date}</p>
                     <p><strong>Price:</strong>{exp.price}</p>
                     <p><strong>Description:</strong>{exp.description}</p>
                  </CardBody>
                  <CardFooter className="text-muted">
                    <div className="card-footer">
                     <Button  onClick={() => this.deleteExperience(exp.id)}>Delete</Button>
                    </div>
                  </CardFooter>
               </Card>
              </div>
               )
             })}
             <p>Do not have Rsvp yet?<Link to='/dashboard'>Back</Link></p>
         </div>
         )      
        }
      }

const mapStateToProps = state => {
  console.log('STATE from USER EXP:', state)
  return {
    loggedInUser: state.loggedInUser,
    registeredUser: state.registeredUser,
    userExperiences: state.userExperiences,

    registerMessage: state.registerMessage,
    loginMessage: state.loginMessage,

    fetchingExperiences: state.fetchingExperiences,
    experiences: state.experiences,

    postingExperience: state.postExperience,
    error: state.error,

    deletingExperience: state.deletingExperience,
    deleteMessage: state.deleteMessage,
  }
}



export default withRouter (
 connect (
   mapStateToProps,
   { getUserExperiences, register, login, getExperiences, postExperience, deleteExperience, updateExperience }
 ) (UserExperiences)
)


//2 Problems
//1. when logged in user is an empty array - happens when signed up & loggedIn user message is empty

//2. when logged in user haven't done any posts yet - map goes over empty object

