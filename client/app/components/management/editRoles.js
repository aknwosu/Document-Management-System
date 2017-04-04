import React from 'react';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getAllRolesAction } from '../../actions/rolesAction';


class UpdateRole extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: 'public',
      userId: jwt.decode(localStorage.getItem('token')).userId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const changeProps = {};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createDocAction(this.state.title, this.state.content, 'public', jwt.decode(localStorage.getItem('token')).userId)
  }


    render() {
      console.log(this.props.user);
      return (
        <div>
        <div className="row">
        <div className="card">
          <div className="row" onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className="input-field col m8">
            <Input type="text"  value={this.state.title} name="title" label="Title"></Input>
            <div className="input-field col m12">
            <textarea type="content" id="textarea1" className="materialize-textarea" value={this.state.content} name="content"></textarea>
            <label htmlFor="textarea1">Type your text here</label>
            </div>
            </div>
              
          </div>
          <button className="waves-effect btn" onClick={this.handleSubmit} type="button" value="submit">Save</button>
        </div>
        </div>
        </div>
      );
    } 
}
const mapStateToProps = (state, ownProps) => {
  return {
    docCreated_Success: state.documentReducer.docCreated_Success
  }
}

const  mapDispatchToProps = {
    createDocAction
  }

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRole);