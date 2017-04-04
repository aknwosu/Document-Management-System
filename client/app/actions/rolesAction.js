import axios from 'axios';
import jwt from 'jsonwebtoken';

const config = {
  headers: {
    authorization: window.localStorage.getItem('token'),
  }
};
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_REJECTED = 'GET_ROLES_REJECTED';

export function getRolesSuccess(allRoles) {
  return { type: GET_ROLES_SUCCESS, payload: allRoles };
}
export function getRolesRejected(err) {
  return { type: GET_ROLES_SUCCESS, payload: allRoles };
}

export function getAllRoles() {
  return (dispatch) => {
    return axios.get('/roles', config)
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      dispatch(getRolesSuccess(response.data));
    }
  })
  .catch((err) => {
    dispatch(getRolesRejected(err.data));
  });
  };
}
