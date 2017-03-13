import React from 'react';
import {Input, Button, Row, Col, Icon } from 'react-materialize';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    $.post('/users/login', this.state)
    .done((data) => {
      console.log(data);
    });
  }
    render() {
      return (
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <Input s={6} type="text" className="form-control" value={this.state.username} name="username" label="Username" validate></Input>
            <Input s={6} type="password" className="form-control" value={this.state.password} name="password" label="Password" validate></Input>
             <input type="submit" value="Submit" />
        </form>
      );
    } 
}
export default Login;