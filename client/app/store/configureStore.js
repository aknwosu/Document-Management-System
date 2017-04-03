import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from './../reducers/rootReducer';

// const configureStore = createStore(
//   rootReducer,
//   applyMiddleware(thunk, reduxImmutableStateInvariant()),
// );
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, reduxImmutableStateInvariant())
));

export default configureStore;
