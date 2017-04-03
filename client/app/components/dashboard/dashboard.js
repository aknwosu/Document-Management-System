import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

// import { Navbar, NavItem, Icon } from 'react-materialize';

import AllDocuments from '../allDocuments/allDocuments';

import { getAllDocs, searchBoxAction } from '../../actions/documentAction';
import { SearchBox } from '../searchDocs/searchDocs';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props.getAllDocs();
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    localStorage.clear('token');
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper purple darken-4 z-depth-3">
            <Link to="/" className="brand-logo">DocumentIt!</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a onClick={this.logOut}>Log out</a></li>
              <li><Link to="/login">Happy Login</Link></li>
              <li><Link to="/documents">Documents</Link></li>
              <li><Link to="/search/documents">Search</Link></li>
            </ul>
          </div>
        </nav> 
        <div className="row">
        <div className="col m3" id="side-nav"> 
           <ul id="slide-out" className="side-nav fixed">
             
            <li className="search">
              <input id="filter" type="text" label="Search" /><i id="filtersubmit" className="material-icons">search</i>
          </li>
      <li><a href="#!">First Sidebar Link</a></li>
      <li><a href="#!">Second Sidebar Link</a></li>
    </ul>
    <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
    <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
    <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
    </div>
    <div className="col m4">
        <div className="app">
          <AllDocuments documents={this.props.documents} />
        </div>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documentReducer.documents,
  }
}

const mapDispatchToProps = {
    getAllDocs,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

