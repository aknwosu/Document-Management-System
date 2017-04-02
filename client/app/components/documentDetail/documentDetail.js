import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getAllDocs } from '../../actions/documentAction';


class DocumentDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { documents } = this.props;
    const { id } = this.props.routeParams;
    const targetDocument = documents.filter(document => document.id === Number(id))

    return (
      <div>
      <div className="card col s12 m6">
        <ul className="card">
          <div>{targetDocument[0].id}</div>
          <div>{targetDocument[0].title}</div>
          <div>{targetDocument[0].content}</div>
        </ul>
      </div>
      <button>Delete</button>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);
