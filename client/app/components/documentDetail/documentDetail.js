import React from 'react';
import jwt from 'jsonwebtoken';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {getAllDocs, deleteDocAction, updateDocumentAction} from '../../actions/documentAction';

class DocumentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
    this.state = 
    {title:"",
    model: ""}
  }
  // handleModelChange(content) {   this.setState({ content }); }

  deleteDocument() {
    const {id} = this.props;
    this.props.deleteDocAction(id);
  }
updateDocument(e) {
  console.log("updating?????")
  const { id, title, model } = this.state
  e.preventDefault();
  this.props.updateDocumentAction(id, title, model);
}


handleModelChange(model) {
  this.setState({model: model});
}

onTitleChange(event){
  this.setState({title: event.target.value})
}

componentDidMount(){
 const {documents} = this.props;
    // const { id } = this.props.routeParams;
    const targetDocument = documents.filter(document => document.id === Number(this.props.routeParams.id))[0]
    const {id, title, content} = targetDocument;
    this.setState({title, model:content, id})
}

  render() {
    return (
      <div>
        <div className="card small col m4">
          <ul>
            {/*<div value={id}>{id}</div>*/}
            <input onChange={this.onTitleChange} type="text" name="fname" value={this.state.title}/>
            <FroalaEditor
              tag="textarea"
              config={this.config}
              id="doc-content"
              model={this.state.model}
              onModelChange={this.handleModelChange}/>
          </ul>
        </div>
        <div>
          <button onClick={this.updateDocument}>Save</button>
          <button onClick={this.deleteDocument}>Delete</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {documents: state.documentReducer.documents, 
    id: ownProps.params.id,
  updateDocResult: state.documentReducer.updateDocument}
}

const mapDispatchToProps = {
  getAllDocs,
  deleteDocAction,
   updateDocumentAction
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);
