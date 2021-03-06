import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {  getUserExperiences, register, login, getExperiences, postExperience, deleteExperience, updateExperience } from '../../actions/actions'
import { Jumbotron,  Alert, Card, Button, CardHeader, CardFooter, CardBody} from 'reactstrap'
import './UserExperiences.css'
import { ClipLoader } from 'react-spinners'



class UserExperiences extends Component {
 

  componentDidMount() {
    if(this.props.registeredUser) {
      this.props.getUserExperiences(this.props.registeredUser.id)
    } else if (this.props.loggedInUser) {
      this.props.getUserExperiences(this.props.loggedInUser.id)
    }
  }

deleteExperience = id => {
   this.props.deleteExperience(id).then(() => {
    this.props.history.push('/dashboard');
  })
}



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
   
     return(
      <div className="user-experiences-page">

       <div className="jumbotron-container">
         <Jumbotron className='user-jumbotron'>

          <div className="cta">
            <h1 id='user-page-cta-header'>Booked Experiences</h1>
            <hr className="my-2"/>
            <div className='user-page-cta-buttons'>
             <Button className='btn-share-user' outline color="primary"><Link to='/dashboard'>All Experiences</Link></Button>
            </div>
           </div>

          <div className="welcome-message">
             {this.props.registerMessage && <Alert color="success">{this.props.registerMessage}</Alert>}
             {this.props.loginMessage && <Alert color="success">{this.props.loginMessage}</Alert>}
          </div>
         </Jumbotron>
        </div>
       
          
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
         </div>
       </div> 
         )      
        }
      }

const mapStateToProps = state => {
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




