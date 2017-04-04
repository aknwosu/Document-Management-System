// import initialState from '../store/initialState';
import { LOGIN_SUCCESSFUL } from '../actions/userAction';
import { SIGNUP_SUCCESSFUL } from '../actions/userAction';

const initialState = {
  user: {},
  login_success: false,
  signup_success: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN_SUCCESSFUL:
    return Object.assign(
      {},
      state,
      { user: action.user, login_success: true });
  case SIGNUP_SUCCESSFUL:
    return Object.assign({}, state, { user: action.user, signup_success: true });
  default:
    return state;
  }
}

