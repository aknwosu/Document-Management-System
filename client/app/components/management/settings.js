import React from 'react';
import jwt from 'jsonwebtoken';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {updateUserAction} from '../../actions/userAction'

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: jwt.decode(localStorage.getItem('token')).userId,
      username: '',
      firstname: '',
      lastname: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.login_success) {
  //     browserHistory.push('/dashboard'); //send to user dashboard
  //   }
  // }

  handleChange(event) {
    const changeProps = {};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateUserAction(
      this.state.id,
      this.state.username,
      this.state.firstname,
      this.state.lastname,
      this.state.password);
  }

  render() {
    const {loginprops} = (this.props);
    return (
      <div>

      <form className="card-small" id="updater" onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <h4>Update your profile</h4>
        <input className="form-control" value={this.state.username}
          name="username" placeholder ="Username"/>
        <input className="form-control" value={this.state.firstname}
          name="firstname" placeholder="First Name"/>
          <input className="form-control" value={this.state.lastname}
          name="lastname" placeholder="Last Name"/>
        <input type="password" className="form-control" value={this.state.password}
          name="password" placeholder="Password"/>
        <input className="waves-effect waves-light btn" type="submit" value="Submit"/>
      </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  // return {login_success: state.userReducer.login_success}
  return {user: state.documentReducer.user}
};

const mapDispatchToProps = {
  updateUserAction
  
    // LoginAction: (email, password) => dispatch(loginEvent(email, password))
  }


export default connect(mapStateToProps, mapDispatchToProps)(Settings);