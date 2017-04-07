// import initialState from '../store/initialState';
import { LOGIN_SUCCESSFUL } from '../actions/userAction';
import { SIGNUP_SUCCESSFUL } from '../actions/userAction';
import { 
  GET_USER_DOCUMENTS_REJECTED,
  GET_USER_DOCUMENTS_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REJECTED } from '../actions/userAction';




const initialState = {
  user: {},
  userDocs: [],
  login_success: false,
  signup_success: false,
  getUserDocs_Success: false,
  getUserDocs_Rejected: false,
  updateUserSuccess: false,
  updateUserRejected: false
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
  case GET_USER_DOCUMENTS_SUCCESS:
    return Object.assign({}, state, { userDocs: action.payload, getUserDocs_Success: true });
  case GET_USER_DOCUMENTS_REJECTED:
    return Object.assign({}, state, { error: action.payload, getUserDocs_Rejected: true });
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
  default:
    return state;
  }
}

