import {
GET_ROLES_SUCCESS,
GET_ROLES_REJECTED,
UPDATE_ROLES_SUCCESS,
UPDATE_ROLES_REJECTED,
DELETE_ROLE_SUCCESS,
DELETE_ROLE_REJECTED,
} from '../actions/rolesAction';

const initialState = {

  allRoles: [],
  error: {},
  currentRole: {},
  getRolesSuccess: false,
  getRolesRejected: false,
  role: {},
  roleDeletedSuccess: false,
  roleDeletedRejected: false
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
  case DELETE_ROLE_SUCCESS:
    return Object.assign({}, state, { deleteRole: action.payload, roleDeletedSuccess: true })
  case DELETE_ROLE_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload, roleDeletedRejected: true }
    );
  default:
    return state;
  }
}
