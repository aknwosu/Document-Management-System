import React from 'react';
import ReactDOM from 'react-dom'
import jwt from 'jsonwebtoken';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import toastr from 'toastr';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {createDocAction} from '../../actions/documentAction'

import {Input, Button, Row, Col, Icon} from 'react-materialize';

class Documents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      userId: jwt
        .decode(localStorage.getItem('token'))
        .userId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
  }
  handleModelChange(content) {
    this.setState({content});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.docCreated_Success) {
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
    if (this.state.title === '') {
      toastr.error('Please enter the required fields');
    } else {
      this.props.createDocAction(this.state.title, this.state.content, this.state.access, jwt.decode(localStorage.getItem('token')).userId)
        .then(() => {
          toastr.success('Document created');
        })
        .catch(() => {
          toastr.error('An error occured creating the document');
        });
    }

    event.preventDefault();
  }

  componentDidMount() {
    $('select').material_select();
    $('#selection').on('change', this.handleChange);
  }

  render() {
    const token = localStorage.getItem('token');
    return (
      <div>
        <div className="row">
          <div className="">
            <div className="row">
              <div className="input-field col m8">
                <Input
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.title}
                  name="title"
                  label="Title"></Input>
                <div className="input-field col m12">
                  <FroalaEditor
                    tag="textarea"
                    config={this.config}
                    id="doc-content"
                    model={this.state.content}
                    onModelChange={this.handleModelChange}/> 
                    {/*<textarea onChange={this.handleChange} type="content" id="textarea1" className="materialize-textarea" value={this.state.content} name="content"></textarea>
            <label htmlFor="textarea1">Type your text here</label>*/}
                </div>
              </div>

            </div>
            <div className="col s3">
              <div className="chip col s8">
                <select
                  onChange={this.handleChange}
                  className="browser-default"
                  name="access"
                  label="XXXXx"
                  value={this.state.access}>
                  <option value="">Choose your option</option>
                  <option value="private">Private</option>
                  <option value="public">Pubilc</option>
                  <option value="role">role</option>
                </select>
              </div>
              <button
                className="waves-effect btn"
                onClick={this.handleSubmit}
                type="button"
                value="submit">Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {docCreated_Success: state.documentReducer.docCreated_Success}
}

const mapDispatchToProps = {
  createDocAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);