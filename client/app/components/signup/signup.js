import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signupEvent } from '../../actions/userAction'
import { Input, Button, Row, Col, Icon } from 'react-materialize';

class Signup extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentWillReceiveProps(nextProps) {
  console.log(nextProps);
  if (nextProps.signup_success){
    browserHistory.push('/'); //should be docs or dashboard
  }
}
  handleChange(event) {
    const changeProps ={};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.SignupAction(
      this.state.username,
      this.state.firstname,
      this.state.lastname,
      this.state.email,
      this.state.password);
  }
  render() {
    return (
      <div id="signup-card" className="card">
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        <div className="form-group" >
          <Input s={6} type="text" className="form-control" value={this.state.username} name="username" label="Username" validate></Input>
          <Input s={6} type="text" className="form-control" value={this.state.firstname} name="firstname" label="First Name" validate></Input>
          <Input s={6} type="text" className="form-control" value={this.state.lastname} name="lastname" label="Last Name" validate></Input>
          <Input s={6} type="text" className="form-control" value={this.state.email} name="email" label="Email" validate></Input>
          <Input s={6} type="password" className="form-control" value={this.state.password} name="password" label="Password" validate></Input>
          </div>
        <input className="waves-effect waves-light btn" type="submit" value="Submit" />
      </form>
      </div>
    );
  }
};

const stateToProps = (state) => {
  return {
    signup_success: state.userReducer.signup_success
  }
}

const actionsToDispatch = (dispatch) => {
  return {
    SignupAction: (username, firstname, lastname, email, password) => 
    dispatch(signupEvent(username, firstname, lastname, email, password))
  };
}
export default connect (stateToProps, actionsToDispatch)(Signup);