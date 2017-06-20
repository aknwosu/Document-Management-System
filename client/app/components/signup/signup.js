import React from 'react';
import { Input } from 'react-materialize';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import { signupEvent } from '../../actions/userAction';

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
if (nextProps.signupState.signupRejected) {
    toastr.error('This email already exists');
}
if (nextProps.signupState.signup_success){
    browserHistory.push('/dashboard'); //should be docs or dashboard
  }
}
  handleChange(event) {
    const changeProps ={};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username || this.state.firstname
      || this.state.lastname ||
      this.state.email ||
      this.state.password  === '') {
      toastr.error('Please enter the required fields');
      }
    this.props.SignupAction(
      this.state.username,
      this.state.firstname,
      this.state.lastname,
      this.state.email,
      this.state.password);
  };
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
    signupState: state.userReducer
  }
}

const actionsToDispatch = (dispatch) => {
  return {
    SignupAction: (username, firstname, lastname, email, password) => 
    dispatch(signupEvent(username, firstname, lastname, email, password))
  };
}
export default connect (stateToProps, actionsToDispatch)(Signup);