import { combineReducers } from 'redux';
import userReducer from './userReducer';
import documentReducer from './documentReducer'

const rootReducer = combineReducers({
  userReducer,
  documentReducer
});
export default rootReducer;
