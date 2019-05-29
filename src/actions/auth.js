import cookie from 'react-cookies';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export function requestLogin(loginData) {
  return {
    type : REQUEST_LOGIN,
    loginData : loginData,
    authError : null
  }
}

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export function receiveLogin(user, err) {
  return {
    type : RECEIVE_LOGIN,
    loggedInUser : user,
    authError : err
  }
}

export const REQUEST_INITIAL_AUTH = 'REQUEST_INITIAL_AUTH';
export function requestInitialAuth() {
  return {
    type : REQUEST_INITIAL_AUTH,
    authError : null
  }
}

export const RECEIVE_INITIAL_AUTH = 'RECEIVE_INITIAL_AUTH';
export function receiveInitialAuth(user, err) {
  return {
    type : RECEIVE_INITIAL_AUTH,
    loggedInUser : user,
    authError : err
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchLogin(loginData) {

  const fakeUser = { 
    username : loginData.username
  };

  return dispatch => {
    dispatch(requestLogin(loginData));
    return timeout(1000)
      .then(() => dispatch(receiveLogin(fakeUser)))
      .then(() => cookie.save('username', fakeUser.username, { path: '/' }))
      .catch(err => dispatch(receiveLogin(null, err)));
  };
}

export function fetchInitialAuth(){
  return dispatch => {
    dispatch(requestInitialAuth());
    return timeout(1000)
      .then(() => {  
        const savedUsername = cookie.load('username');
        return savedUsername ? { username: savedUsername } : null;
      })
      .then(user => dispatch(receiveInitialAuth(user)))
      .catch(err => dispatch(receiveInitialAuth(null, err)));
  };
}