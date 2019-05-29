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
      .catch(err => dispatch(receiveLogin(null, err)));
  };
}

