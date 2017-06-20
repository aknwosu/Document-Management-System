import { combineReducers } from 'redux';
import userReducer from './userReducer';
import documentReducer from './documentReducer';
import rolesReducer from './rolesReducer';

const rootReducer = combineReducers({
  userReducer,
  documentReducer,
  rolesReducer
});
export default rootReducer;
