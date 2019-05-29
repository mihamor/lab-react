import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN
} from '../actions/auth';


const initialState = {
  loginData : null,
  loggedInUser : null,
  isFetchingLogin : false,
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
    default:
      return state;
  }
}





function combinedReducer(state = initialState, action){
switch (action.type) {
  case REQUEST_LOGIN:
  case RECEIVE_LOGIN:
    return login(state, action);
  default:
    return state;
  }
}
export default combinedReducer;