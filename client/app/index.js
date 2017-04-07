import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min';
import '../../node_modules/material-icons/css/material-icons.css';
import Main from './components/main/main';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Documents from './components/documents/documents';
import SearchBox from './components/searchDocs/searchDocs';
import UserDocuments from './components/userDocuments/userDocuments';
import Management from './components/management/management'
import AllRoles from './components/management/allRoles';
import Settings from './components/management/settings';
import DocumentDetail from './components/documentDetail/documentDetail';
import UpdateRoles from './components/management/allRoles'
import initialState from './store/initialState'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js'

// import store from './store/configureStore'
import './styles/styles.css';

let store = configureStore();
const onEnter = (next, replace, cb) => {
   const token = localStorage.getItem('token');
  if(!token && next.location.pathname.indexOf('dashboard') > -1) {
    replace('/login');
  }
  if(token && (next.location.pathname.indexOf('login') > -1 || next.location.pathname.indexOf('signup') > -1)) {
    replace('/dashboard');
  }
  cb();
}

 render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
      <IndexRoute to="/login"/>
      <Route path="/signup" component={Signup} onEnter={onEnter} />
      <Route path="/login" component={Login} onEnter={onEnter} />
      <Route path="/settings" component={Settings} onEnter={onEnter} />
      <Route path="/dashboard" component={Dashboard} onEnter={onEnter}/>
      <Route path="/documents" component={Documents} onEnter={onEnter} />
      <Route path="/documents/:id" component={DocumentDetail} onEnter={onEnter} />
      <Route path="/search/documents" component={SearchBox} onEnter={onEnter} />
      <Route path="/management" component={SearchBox} onEnter={onEnter} />
      <Route path="/allRoles" component={AllRoles} onEnter={onEnter} />
      <Route path="/users/:id/documents" component={UserDocuments} onEnter={onEnter}/>
      {/*<Route path="/roles/:id" commponent={updateRole} onEnter={onEnter} />*/}
    </Router> 
  </Provider>,
  document.getElementById('app'));