import React from 'react';
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

// let myStyle= {
//   fontSize: 28,
//   color: '#00FFFF'

// }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    $.post("/users", this.state)
    .done((data) => {
      console.log(data);
    });
    // fetch(`/users`,{
    //   method: 'POST',
    //   body: this.state
    // }).then((response) => {
    //   console.log(response);
    // }).catch((err)=>{
    //   console.log(error);
    // })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        <div className="form-group" >
          <Input s={6} type="text" className="form-control" value={this.state.username} name="username" label="Username" validate></Input>
          <Input s={6} type="text" className="form-control" value={this.state.firstname} name="firstname" label="First Name" validate></Input>
          <Input s={6} type="text" className="form-control" value={this.state.lastname} name="lastname" label="Last Name" validate></Input>
          <Input s={6} type="text" className="form-control" value={this.state.email} name="email" label="Email" validate></Input>
          <Input s={6} type="password" className="form-control" value={this.state.password} name="password" label="Password" validate></Input>
          </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Signup;