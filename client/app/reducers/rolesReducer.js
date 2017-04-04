import {
GET_ROLES_SUCCESS,
GET_ROLES_REJECTED,
UPDATE_ROLES_SUCCESS,
UPDATE_ROLES_REJECTED

} from '../actions/rolesAction';

const initialState = {
  allRoles: [],
  error: {},
  currentRole: {},
  getRolesSuccess: false,
  getRolesRejected: false,
  role: {}
};

export default function rolesReducer(state = initialState, action) {
  switch (action.type) {
  case GET_ROLES_SUCCESS:
    return Object.assign(
      {},
      state,
      { allRoles: action.payload, getRolesSuccess: true }
    );
  case GET_ROLES_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload }
    );
  case UPDATE_ROLES_SUCCESS:
    return Object.assign(
      {},
      state,
      { role: action.payload.role, updateRoleSuccess: true }
    );
  case UPDATE_ROLES_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload, updateRoleRejected: true }
    );
  default:
    return state;
  }
}
