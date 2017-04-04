
 import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import documentit from '../../common/images/documentit.jpg';
import Login from '../../components/login/login';
// import { Navbar, NavItem, Icon } from 'react-materialize';


class Main extends React.Component {
  render() {
    const token = localStorage.getItem('token');
    return (
      <div>
        <div>
        <nav>
          <div className="nav-wrapper purple darken-4 z-depth-3">
            <Link to="/" className="brand-logo">DocumentIt!</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {token && <li><Link to="/signup">Signup</Link></li>}
              {token && <li><Link to="/login">Login</Link></li>}
            </ul>
          </div>
        </nav>
        </div>
          <div className="card mainImage">
    <div className="card-image waves-effect waves-block waves-light">
      <img className="activator" src={documentit}/>
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">Login</span>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">Enter Your Login Details Below<span className="material-icons right">close</span></span>
      <Login loginprops={this.props.loginprops}/>
    </div>
  </div>

        <div className="app">

          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Main;
