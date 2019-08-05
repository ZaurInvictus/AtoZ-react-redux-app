import axios from 'axios'
import { axiosWithAuth } from "../axiosWithAuth";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";


export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START });
  return axios
    .post('https://atoz-backend.herokuapp.com/api/register', creds)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({ 
        type: REGISTER_SUCCESS, 
        payload: res.data.newUser, 
        message: res.data.message});
     })
    .catch(err => {
      dispatch({ type: REGISTER_ERROR, payload: err.message });
    });
 };


export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";


export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post('https://atoz-backend.herokuapp.com/api/login', creds)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: res.data.user,
        message: res.data.message});
    })
    .catch(err => {
      dispatch({ type: LOGIN_ERROR, payload: err.message });
    });
 };


 export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

 export const logout = () => {
  return {
    type: 'LOGOUT_SUCCESS'
  }
};


export const FETCH_EXPERIENCES_START = "FETCH_EXPERIENCES_START";
export const FETCH_EXPERIENCES_SUCCESS = "FETCH_EXPERIENCES_SUCCESS";
export const FETCH_EXPERIENCES_ERROR = "FETCH_EXPERIENCES_ERROR";


export const getExperiences = () => dispatch => {
  dispatch({ type: FETCH_EXPERIENCES_START });
  axiosWithAuth()
 .get('/experiences')
 .then(res => {
   dispatch({type: FETCH_EXPERIENCES_SUCCESS, payload: res.data.experiences})
 })
  .catch(err => {
    dispatch({type: FETCH_EXPERIENCES_ERROR, payload: err.message})
  })
};


export const POSTING_START = "POSTING_START";
export const POSTING_SUCCESS = "POSTING_SUCCESS";
export const POSTING_ERROR = "POSTING_ERROR";


export const postExperience = experience => {
  const newExperience =  axiosWithAuth()
  .post(`/experiences`, experience);
   return dispatch => {
    dispatch({ type: POSTING_START });
    newExperience
      .then(res => {
        dispatch({ type: POSTING_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: POSTING_ERROR, payload: err.message });
      });
  };
};


//DELETE
export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_ERROR = "DELETE_ERROR";
export const USER_UNAUTHORIZED = 'USER_UNAUTHORIZED';


export const deleteExperience = id => dispatch => {
  dispatch({ type: DELETE_START });
  return axios
    .delete(`https://atoz-backend.herokuapp.com/api/experiences/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(res => {
      dispatch({
         type: DELETE_SUCCESS, 
         message: res.data.message
        });
    })
    .catch(err => {
      if (err.response.status === 500) {
        dispatch({ type: USER_UNAUTHORIZED, payload: err.response });
      } else {
        dispatch({ type: DELETE_ERROR, payload: err.response });
      }
    });
};


//EDIT
export const EDIT_EXPERIENCE_START = 'EDIT_EXPERIENCE_START';
export const EDIT_EXPERIENCE_SUCCESS = 'EDIT_EXPERIENCE_SUCCESS';
export const EDIT_EXPERIENCE_FAILURE = 'EDIT_EXPERIENCE_FAILURE';

export const updateExperience = experience => dispatch => {
  dispatch({ type: EDIT_EXPERIENCE_START })
  return axios
    .put(`https://atoz-backend.herokuapp.com/api/experiences/${experience.id}`, experience, { 
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(res => {
      dispatch({ type: EDIT_EXPERIENCE_SUCCESS, payload: res.data.experiences });
    })
    .catch(err => {
      if (err.response.status === 403) {
        dispatch({ type: USER_UNAUTHORIZED, payload: err });
      } else {
        dispatch({ type: EDIT_EXPERIENCE_FAILURE, payload: err.data });
      }
    });
};



//RSVP USER TO EXPERIENCE
export const RSVP_START = "RSVP_START";
export const RSVP_SUCCESS = "RSVP_SUCCESS";
export const RSVP_ERROR = "RSVP_ERROR";

export const rsvpExperience = creds => dispatch =>{
   dispatch({ type: RSVP_START })
   return axiosWithAuth()
  .post(`/experiences/attend`, creds)
  .then(res => {
    console.log('RES of RSVP AXIOS CALL', res)
       dispatch({ type: RSVP_SUCCESS, payload: res.data.message });
   })
   .catch(err => {
        dispatch({ type: RSVP_ERROR, payload: err});
   });
};


// GET EXPERIENCES USER EXPERIENCES 
export const GET_USER_EXP_START = "GET_USER_EXP_START";
export const GET_USER_EXP_SUCCESS = "GET_USER_EXP_SUCCESS";
export const GET_USER_EXP_ERROR = "GET_USER_EXP_ERROR";


export const getUserExperiences = (id) => dispatch => {
  dispatch({ type: GET_USER_EXP_START })
  return axios
    .get(`https://atoz-backend.herokuapp.com/api/users/${id}/experiences_attending`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(res => {
      console.log('RES OF GET USER EXPERIENCES BY USER ID', res)
      dispatch({
         type: GET_USER_EXP_SUCCESS, 
         payload: res.data,
        });
    })
    .catch(err => {
      console.log('call failed: ', err.response);
        dispatch({ type: GET_USER_EXP_ERROR, payload: err.response })
    });
};




