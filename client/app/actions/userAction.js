import axios from 'axios';
//import jwt from 'jsonwebtoken';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';

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
        console.log(localStorage.getItem('token'));
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

export { signupEvent };

export { loginEvent };

export { signupSuccess };

export default loginSuccess;
