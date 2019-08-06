import React from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { connect } from 'react-redux'
import { register, login } from './actions/actions'

import './App.css'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { logout } from './actions/actions'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'
import PostExperience from './components/Forms/PostForm'
import Rsvp from './components/Rsvp/Rsvp'
import UserExperiences from './components/Rsvp/UserExperiences'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';


class App extends React.Component {
  state = {
    isOpen: false
  };

  toggle =()=> {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  logOut = e => {
    e.preventDefault()
    this.props.logout()
    localStorage.removeItem('token')
    this.props.history.push('/')
  }

  render() {
   return (
    <div className="App">
        <Navbar className='navbar' color="light" light expand="md">
          <Link to='/'>
            <i className="fas fa-city"></i>
              <span className="brand">ATOZ</span>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.loggedIn ? 
             <div className="menu-bar">
             <NavItem>
               <Link to='/user-page'>Your Bookings</Link>
             </NavItem>
               <span>Signed In as <strong><em>{this.props.registeredUser.username}</em></strong></span>
             </div> : 
              <span>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Sign Up</Link>
              </span>
             }
              <NavItem>
                <NavLink >
                  <button onClick={this.logOut} className="btn btm-sm btn-primary">Logout</button> 
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      
       <header className="App-header">
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route
         exact path='/'
         component={Home}
        />
        <PrivateRoute
         exact path='/dashboard'
         component={Dashboard}
        />
        <PrivateRoute
         exact path='/post'
         component={PostExperience}
        />
        <PrivateRoute
         exact path='/rsvp'
         component={Rsvp}
        />
        <PrivateRoute
         exact path='/user-page'
         component={UserExperiences}
        />
      </header>
    </div>
  )
 }
}

const mapStateToProps = state => {
  return {
    registeredUser: state.registeredUser,
    loggedInUser: state.loggedInUser,
    loggedIn: state.loggedIn,
    logout: state.logout
  }
}

export default withRouter(
connect(
    mapStateToProps,
    { register, login, logout }
  )(App)
)

