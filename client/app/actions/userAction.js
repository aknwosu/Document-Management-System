import axios from 'axios';
//import jwt from 'jsonwebtoken';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
export const GET_USER_DOCUMENTS_SUCCESS = 'GET_USER_DOCUMENTS_SUCCESS';
export const GET_USER_DOCUMENTS_REJECTED = 'GET_USER_DOCUMENTS_REJECTED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_REJECTED = 'UPDATE_USER_REJECTED';

const hostname = window.location.origin;

const loginSuccess = (user) => {
  console.log("succesful");
  return { type: LOGIN_SUCCESSFUL, user };
}
const signupSuccess = (user) => {
  return { type: SIGNUP_SUCCESSFUL, user };
}
const loginEvent = (email, password) => {
  return (dispatch) => {
    return axios.post('/users/login', {
      email,
      password
    }).then((response) => {
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        dispatch(loginSuccess(response.data));
      }
      //  else {
      //   console.log(response);
      // }
    }).catch((err) => {
      throw new Error(err);
    });
  };
};

const signupEvent = (username, firstname, lastname, email, password) => {
  return (dispatch) => {
    return axios.post('/users', {
      username,
      firstname,
      lastname,
      email,
      password
    }).then((response) => {
      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        dispatch(signupSuccess(response.data));
      }
    }).catch((err) => {
      throw new Error(err);
    });
  };
};

export function getUserDocsSuccess(documents) {
  return { type: GET_USER_DOCUMENTS_SUCCESS, payload: documents };
}

export function getUserDocsRejected(err) {
  return { type: GET_USER_DOCUMENTS_REJECTED, payload: err };
}

export function getUserDocsAction(userId) {
  const url = `/users/${userId}/documents`;
  return (dispatch) => {
    return axios.get(url, { headers: {
      authorization: window.localStorage.getItem('token') },
    })
    .then((response) => {
      console.log("full response", response);
      if (response.status >= 200 && response.status < 300) {
        return dispatch(getUserDocsSuccess(response.data));
      }
    }).catch((err) => {
      console.log("error", err);
      dispatch(getUserDocsRejected(err.data));
    });
  };
}

export function updateUserSuccess(documents) {
  return { type: UPDATE_USER_SUCCESS, payload: documents };
}

export function updateUserRejected(err) {
  return { type: UPDATE_USER_REJECTED, payload: err };
}

export function updateUserAction(id, username, firstname, lastname, password) {
  console.log( {id, username, firstname, lastname, password });
  const url = `${hostname}/users/${id}`;
  return (dispatch) => {
    return axios.put(url,
      { username,
        firstname,
        lastname,
        password }, { headers: {
          authorization: window.localStorage.getItem('token') },
        })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(updateUserSuccess(response.data));
      }
    }).catch((err) => {
      dispatch(updateUserRejected(err.data));
    });
  };
}

export { signupEvent };

export { loginEvent };

export { signupSuccess };

export default loginSuccess;
