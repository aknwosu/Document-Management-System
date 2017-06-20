/* eslint require-jsdoc: "off"  */
import React from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import AllDocuments from '../allDocuments/allDocuments';

import { getAllDocs, searchBoxAction } from '../../actions/documentAction';
import { getUserDocsAction } from '../../actions/userAction';
import UserDocuments from '../userDocuments/userDocuments';

import { SearchBox } from '../searchDocs/searchDocs';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserDocument: false,
      searchTerm: '',
      search: false,
      userId: jwt.decode(localStorage.getItem('token')).userId,
      username: jwt.decode(localStorage.getItem('token')).username

    };
    this.props.getAllDocs();
    this.logOut = this.logOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick.bind = this.handleClick.bind(this);
  }

  logOut() {
    localStorage.clear('token');
    browserHistory.push('/');
  }

handleClick(){
  this.setState({showUserDocument: true})
}

 handleChange(event) {
    const changeProps = {};
    this.setState({searchTerm: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({search: true});
    this.props.searchBoxAction(this.state.searchTerm)
  }

  render() {
    const token = localStorage.getItem('token');
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper purple darken-4">
              <Link to="/" className="brand-logo">DocumentIt!</Link>
              <ul id="nav-mobile" className="right">
                <li>
                  <a>Hello {this.state.username}</a>
                </li>
                <li>
                  <a onClick={this.logOut}>Log out</a>
                </li>
                <li>
                  <Link to="/search/documents">Search</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="row">
          <div className="col m3" id="side-nav">
            <ul id="slide-out" className="side-nav fixed">

              <li className="search">
                <input onChange={this.handleChange}  value={this.state.searchTerm} id="filter" type="text" label="Search"/>
                <i onClick={this.handleSubmit} id="filtersubmit" name='searchTerm' className="material-icons">search</i>
              </li>
              
              {token && <li id="sidechip">
                <Link  className="chip z-depth-3 white-text hoverable purple darken-2" id="sidechip" to="/documents">Create Document</Link>
              </li>}
              {jwt.decode(token).roleId === 1 && <li id="sidechip">
                <a  className="chip z-depth-3 hoverable" id="sidechip" href="/allRoles">Roles</a>
              </li>}
              <li id="sidechip">
                <a className="chip z-depth-3  hoverable white-text purple darken-2" onClick={this.handleClick}>My Documents</a>
              </li>
              <li id="sidechip"><Link to="/settings" className="chip z-depth-3 hoverable">Settings</Link></li>
              <li id="sidechip"><Link to="/allUsers"  className="chip white-text hoverable z-depth-3 purple darken-2">All Users</Link></li>
            </ul>
            <a
              href="#"
              data-activates="slide-out"
              className="button-collapse show-on-large">
              <i className="material-icons">menu</i>
            </a>
          </div>
          <div className="col m4">
            <div className="app">
              
              {this.state.showUserDocument ?<div><h4>User Documents</h4> <UserDocuments /></div> : ""}
              {this.state.search ? <h4>Search Result....</h4>: ""}
              <AllDocuments  documents={this.props.searchResult} />
              <h4> Documents</h4>
              <AllDocuments documents={this.props.documents}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { documents: state.documentReducer.documents,
    searchResult: state.documentReducer.searchBox,
    getUserDocs: state.userReducer.userDocs
  };
};

const mapDispatchToProps = {
  getAllDocs, searchBoxAction, getUserDocsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
