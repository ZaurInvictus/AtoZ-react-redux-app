import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,

  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

  LOGOUT_SUCCESS,

  FETCH_EXPERIENCES_START,
  FETCH_EXPERIENCES_SUCCESS,
  FETCH_EXPERIENCES_ERROR ,

  POSTING_START,
  POSTING_SUCCESS,
  POSTING_ERROR,

  DELETE_START,
  DELETE_SUCCESS,
  USER_UNAUTHORIZED,

  EDIT_EXPERIENCE_START,
  EDIT_EXPERIENCE_SUCCESS,
  EDIT_EXPERIENCE_FAILURE,

  RSVP_START, 
  RSVP_SUCCESS, 
  RSVP_ERROR,

   GET_USER_EXP_START,
   GET_USER_EXP_SUCCESS,
   GET_USER_EXP_ERROR
} from "../actions/actions";



const initialState = {
  registering: false,
  registerMessage: null,
  registeredUser: '',

  loggedInUser: [],
  loginMessage: null,
  isLoggingIn: false,
  loggedIn: false, 

  error: null,

  experiences: [],
  fetchingExperiences: false,
  postingExperience: false,
  editingExperience: false,
  deletingExperience: false,
  deleteMessage: '', 

  userExperiences: []
}


export const reducer = (state = initialState, action) => {
  switch(action.type){

    //REGISTER
    case REGISTER_START:
      return {
        ...state,
          error: null,
          registering: true,
          newUser: ''
     }

      case REGISTER_SUCCESS:
        return {
          ...state,
          error: null,
          registering: false,
          registerMessage: action.message,
          newUser: action.payload,
          loggedIn: true,
          loginMessage: '',
          registeredUser: action.payload
        }

        case REGISTER_ERROR:
          return {
            ...state,
            registering: false,
            error: action.payload,
            loggedIn: false,
            newUser: '',
            registerMessage: 'User with this username already exists. Please log in!',
            loginMessage: '',
          }

           //LOGIN 
      case LOGIN_START:
       return {
        ...state,
          error: null,
          isLoggingIn: true,
          loggedInUser: '',
          loggedIn: false,
      }

      case LOGIN_SUCCESS:
        return {
          ...state,
          error: null,
          isLoggingIn: false,
          loginMessage: action.message,
          loggedInUser: action.payload,
          loggedIn: true,
          logout: true,
          registerMessage: '',
          registeredUser: action.payload
        }

        case LOGIN_ERROR:
          return {
            ...state,
            isLoggingIn: false,
            error: action.payload,
            loggedInUser: '',
            loggedIn: false,
            registerMessage: action.payload,
          }

          //LOGOUT
          case LOGOUT_SUCCESS:
            return {
              ...state,
              registerMessage: '',
              loginMessage: '',
              loggedInUser: '',
              newUser: '',
              loggedIn: false,
            }

          //FETCHING EXPERIENCES
        case FETCH_EXPERIENCES_START:
          return {
            ...state,
            fetchingExperiences: true,
            error: null
          }

        case FETCH_EXPERIENCES_SUCCESS:
          return {
            ...state,
           fetchingExperiences: false,
           error: null,
           experiences: action.payload
          }

        case FETCH_EXPERIENCES_ERROR:
          return {
            ...state,
            fetchingExperiences: false,
            error: action.payload
          }
          
          //POSTING EXPERIENCES  
          case POSTING_START:
            return {
              ...state,
              postingExperience: true,
              error: null,
            }
          case POSTING_SUCCESS:
            return {
              ...state,
              postingExperience: false,
              error: null,
              experiences: action.payload,
              registerMessage: 'Your experience has been successfully added!',
              loginMessage: '',
            }
          case POSTING_ERROR:
            return {
              ...state,
              postingExperience: false,
              loginMessage: '',
              registerMessage: action.payload, 
            }
              
              //DELETING EXPERIENCE
            case DELETE_START:
              return {
                ...state,
                deletingExperience: true
              };
            case DELETE_SUCCESS:
              return {
                ...state,
                deletingExperience: false,
                error: '',
                registerMessage: action.message, 
                loginMessage: '',
              };
              case USER_UNAUTHORIZED:
                return {
                  ...state,
                  error: action.payload.data.error,
                  errorStatusCode: action.payload.status,
                  fetchingFriends: false,
                  deleteMessage: ''
                };


                // EDIT EXPERIENCE
                case EDIT_EXPERIENCE_START:
                  return {
                    ...state,
                    editingExperience: true,
                    registerMessage: 'Experience was successfully updated.', 
                    loginMessage: '',
                  };
                case EDIT_EXPERIENCE_SUCCESS:
                  return {
                    ...state,
                    editingExperience: false,
                    error: '',
                    experiences: action.payload,
                  };
                case EDIT_EXPERIENCE_FAILURE:
                  return {
                    ...state,
                    editingExperience: false,
                    error: action.payload,
                };


                 // RSVP EXPERIENCE
                 case RSVP_START:
                  return {
                    ...state,
                    rsvpError: '',
                  };

                case RSVP_SUCCESS:
                  return {
                    ...state,
                    registerMessage: action.payload, 
                    rsvpError: '',
                    loginMessage: '',
                  };

                  case RSVP_ERROR: 
                  return {
                    rsvpError: 'User or experience Id is wrong. Please try again.',
                  }


                  // EXPERIENCES USER ATTENDING
                 case GET_USER_EXP_START:
                  return {
                    ...state,
                   
                  };

                 case GET_USER_EXP_SUCCESS:
                  return {
                    ...state,
                    registerMessage: '', 
                    userExperiences: action.payload
                  };

         default:
         return state
       }
      }
      
    