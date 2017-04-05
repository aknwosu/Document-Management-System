import axios from 'axios';
import jwt from 'jsonwebtoken';

const config = {
  headers: {
    authorization: window.localStorage.getItem('token'),
  }
};
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_REJECTED = 'GET_ROLES_REJECTED';
export const UPDATE_ROLES_SUCCESS = 'UPDATE_ROLES_SUCCESS';
export const UPDATE_ROLES_REJECTED = 'UPDATE_ROLES_REJECTED';
export const DELETE_ROLES_SUCCESS = 'DELETE_ROLES_SUCCESS';
export const DELETE_ROLES_REJECTED = 'DELETE_ROLES_REJECTED';


export function getRolesSuccess(roles) {
  return { type: GET_ROLES_SUCCESS, payload: roles };
}
export function getRolesRejected(err) {
  return { type: GET_ROLES_SUCCESS, payload: err };
}

export function getAllRolesAction() {
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
export function updateRolesSuccess(role) {
  return { type: UPDATE_ROLES_SUCCESS, payload: roles };
}
export function updateRolesRejected(err) {
  return { type: UPDATE_ROLES_REJECTED, payload: err };
}

export function updateRolesAction(role) {
  console.log('role', role);
  return (dispatch) => {
    return axios.put(`/roles/${role.id}`, role, config)
    .then((response) => {
      console.log('response', response.data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(updateRolesSuccess());
      }
    }).catch((err) => {
      dispatch(updateRolesRejected(err.data));
    });
  };
}

export const roleDeletedSuccess = (deleteRole) => {
  return { type: DELETE_ROLES_SUCCESS, deleteRole };
}
export const roleDeletedRejected = (err) => {
  return { type: DELETE_ROLES_REJECTED, payload: err };
}

export function deleteRoleAction(id) {
  return (dispatch) => {
    axios.delete(`/roles/${id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      }
    }).catch((err) => {
      dispatch(roleDeletedRejected(err.data));
    });
  };
}
