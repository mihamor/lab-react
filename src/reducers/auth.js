import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  RECEIVE_INITIAL_AUTH,
  REQUEST_INITIAL_AUTH,
  LOGOUT
} from '../actions/auth';

const initialState = {
  loginData : null,
  loggedInUser : null,
  isFetchingLogin : false,
  isFetchingInitialAuth : false,
};



function login(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        loginData : action.loginData,
        isFetchingLogin : true
      })
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        loggedInUser : action.loggedInUser,
        isFetchingLogin : false
      })
    case REQUEST_INITIAL_AUTH:
      return Object.assign({}, state, {
        isFetchingInitialAuth : true
      })
    case RECEIVE_INITIAL_AUTH:
      return Object.assign({}, state, {
        loggedInUser : action.loggedInUser,
        isFetchingInitialAuth : false
      })
    case LOGOUT:
      return Object.assign({}, state, {
        loggedInUser : null
      })
    default:
      return state;
  }
}

function combinedReducer(state = initialState, action){
switch (action.type) {
  case REQUEST_LOGIN:
  case RECEIVE_LOGIN:
  case RECEIVE_INITIAL_AUTH:
  case REQUEST_INITIAL_AUTH:
  case LOGOUT:
    return login(state, action);
  default:
    return state;
  }
}
export default combinedReducer;