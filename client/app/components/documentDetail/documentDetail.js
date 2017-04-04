import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getAllDocs, deleteDocAction } from '../../actions/documentAction';


class DocumentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this)
  }
  

  deleteDocument() {
      const { id } = this.props.routeParams;
      this.props.deleteDocAction(Number(id));
  }

  render() {
    const { documents } = this.props;
    // const { id } = this.props.routeParams;
    const targetDocument = documents.filter(document => 
      document.id === Number(this.props.routeParams.id))[0]
    const { id, title, content } = targetDocument;

    return (
      <div>
        <div className="card col s12 m6">
          <ul className="card">
            <div value={id}>{id}</div>
            <div>{title}</div>
            <div>{content}</div>
          </ul>
        </div>
        <div>
          <button onClick={this.deleteDocument}>Delete</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documentReducer.documents,
  }
}

const mapDispatchToProps = {
    getAllDocs,
    deleteDocAction
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);
