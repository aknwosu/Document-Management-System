/* eslint require-jsdoc: "off"  */
import axios from 'axios';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
export const SIGNUP_REJECTED = 'SIGNUP_REJECTED';
export const GET_USER_DOCUMENTS_SUCCESS = 'GET_USER_DOCUMENTS_SUCCESS';
export const GET_USER_DOCUMENTS_REJECTED = 'GET_USER_DOCUMENTS_REJECTED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_REJECTED = 'UPDATE_USER_REJECTED';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_REJECTED = 'GET_USERS_REJECTED';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_REJECTED = 'DELETE_USER_REJECTED';

const hostname = window.location.origin;

const loginSuccess = (user) => {
  return { type: LOGIN_SUCCESSFUL, user };
};
const loginEvent = (email, password) => {
  return (dispatch) => {
    return axios.post('/api/users/login', {
      email,
      password
    }).then((response) => {
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        dispatch(loginSuccess(response.data));
      }
    }).catch((err) => {
      throw new Error(err);
    });
  };
};

function signupSuccess(signedUser) {
  return { type: SIGNUP_SUCCESSFUL, payload: signedUser };
}
export function signupRejected(err) {
  return { type: SIGNUP_REJECTED, payload: err };
}

const signupEvent = (username, firstname, lastname, email, password) => {
  return (dispatch) => {
    return axios.post('/api/users', {
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
      dispatch(signupRejected(err.data));
    });
  };
};

export function getUsersSuccess(users) {
  return { type: GET_USERS_SUCCESS, payload: users };
}
export function getUsersRejected(err) {
  return { type: GET_USERS_REJECTED, payload: err };
}

export function getAllUsersAction() {
  return (dispatch) => {
    return axios.get('/api/users',
      { headers: {
        authorization: localStorage.getItem('token') } })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(getUsersSuccess(response.data));
      }
    })
  .catch((err) => {
    dispatch(getUsersRejected(err.data));
  });
  };
}


export function getUserDocsSuccess(documents) {
  return { type: GET_USER_DOCUMENTS_SUCCESS, payload: documents };
}

export function getUserDocsRejected(err) {
  return { type: GET_USER_DOCUMENTS_REJECTED, payload: err };
}

export function getUserDocsAction(userId) {
  const url = `/api/users/${userId}/documents`;
  return (dispatch) => {
    return axios.get(url, { headers: {
      authorization: window.localStorage.getItem('token') },
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return dispatch(getUserDocsSuccess(response.data));
      }
    }).catch((err) => {
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
  const url = `${hostname}/api/users/${id}`;
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

export const userDeletedSuccess = (deleteUser) => {
  return { type: DELETE_USER_SUCCESS, deleteUser };
};
export const userDeletedRejected = (err) => {
  return { type: DELETE_USER_REJECTED, payload: err };
};

export function deleteUserAction(id) {
  return (dispatch) => {
    axios.delete(`/api/users/${id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      }
    }).then((response) => {
      if (response.status === 200) {
        dispatch(userDeletedSuccess(response.data));
      }
    }).catch((err) => {
      dispatch(userDeletedRejected(err.data));
    });
  };
}


export { signupEvent };

export { loginEvent };

export { signupSuccess };

export default loginSuccess;
