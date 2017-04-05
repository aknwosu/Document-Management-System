import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {loginEvent} from '../../actions/userAction'
import {Input, Button, Row, Col, Icon} from 'react-materialize';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login_success) {
      browserHistory.push('/dashboard'); //send to user dashboard
    }
  }

  handleChange(event) {
    const changeProps = {};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
  }

  handleSubmit(event) {
    event.preventDefault();
    this
      .props
      .LoginAction(this.state.email, this.state.password);
  }

  render() {
    const {loginprops} = (this.props);
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <Input
          s={6}
          type="email"
          className="form-control"
          value={this.state.email}
          name="email"
          label="email"
          validate></Input>
        <Input
          s={6}
          type="password"
          className="form-control"
          value={this.state.password}
          name="password"
          label="Password"
          validate></Input>
        <input className="waves-effect waves-light btn" type="submit" value="Submit"/>
      </form>
    );
  }
}
const stateToProps = (state) => {
  return {login_success: state.userReducer.login_success}
};

const actionsToDispatch = (dispatch) => {
  return {
    LoginAction: (email, password) => dispatch(loginEvent(email, password))
  };
}

export default connect(stateToProps, actionsToDispatch)(Login);