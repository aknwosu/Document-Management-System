import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

// import { Navbar, NavItem, Icon } from 'react-materialize';

import AllDocuments from '../allDocuments/allDocuments';

import { getAllDocs } from '../../actions/documentAction';

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
            </ul>
          </div>
        </nav>
        <div className="app">
          <AllDocuments documents={this.props.documents} />
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
