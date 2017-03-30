import React from 'react';
import { Link } from 'react-router';
// import { Navbar, NavItem, Icon } from 'react-materialize';


class Main extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper purple darken-4 z-depth-3">
            <Link to="/" className="brand-logo">DocumentIt!</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </nav>
        <div className="app">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Main;