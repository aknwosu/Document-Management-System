// import initialState from '../store/initialState';
import { LOGIN_SUCCESSFUL } from '../actions/userAction';
import {
  SIGNUP_SUCCESSFUL,
  SIGNUP_REJECTED,
  GET_USER_DOCUMENTS_REJECTED,
  GET_USER_DOCUMENTS_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REJECTED,
  GET_USERS_SUCCESS,
  GET_USERS_REJECTED,
  DELETE_USER_SUCCESS,
  DELETE_USER_REJECTED

 } from '../actions/userAction';




const initialState = {
  user: {},
  userDocs: { documents: [] },
  documents: [],
  login_success: false,
  signup_success: false,
  signupRejected: false,
  getUserDocs_Success: false,
  getUserDocs_Rejected: false,
  updateUserSuccess: false,
  updateUserRejected: false,
  getUsersSuccess: false,
  getUsersRejected: false,
  userDeletedSuccess: false,
  userDeletedRejected: false

};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN_SUCCESSFUL:
    return Object.assign(
      {},
      state,
      { user: action.user, login_success: true });
  case SIGNUP_SUCCESSFUL:
    return Object.assign(
      {},
      state,
      { user: action.user, signup_success: true });
  case SIGNUP_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload, signupRejected: true });
  case GET_USER_DOCUMENTS_SUCCESS:
    return Object.assign({}, state, { userDocs: action.payload, getUserDocs_Success: true });
  case GET_USER_DOCUMENTS_REJECTED:
    return Object.assign({}, state, { error: action, getUserDocs_Rejected: true });
  case UPDATE_USER_SUCCESS:
    return Object.assign(
      {},
      state,
      { updatedUser: action.payload, updateUserSuccess: true }
    );
  case UPDATE_USER_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload, updateUserRejected: true }
    );
  case GET_USERS_SUCCESS:
    return Object.assign(
      {},
      state,
      { users: action.payload.users.rows, getUsersSuccess: true }
    );
  case GET_USERS_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload.documents, getUsersRejected: true }
    );
  case DELETE_USER_SUCCESS:
    return Object.assign(
      {},
      state,
      { deletedUser: action.payload, userDeletedSuccess: true }
    );
  case DELETE_USER_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload, userDeletedRejected: true }
    );
  default:
    return state;
  }
}

