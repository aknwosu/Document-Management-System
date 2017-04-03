import React from 'react';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router';

export default class AllDocuments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { documents } = this.props;
    const mappedDocs = documents.map((document) =>
      <li className="card-panel" key={document.id}>
        <Link to={`/documents/${document.id}`}>
          {document.title}
        </Link>
      </li>
    );

    return (
      <div>
        <ul>
          {mappedDocs || <p>Hello</p>}
        </ul>
      </div>
    );
  }
}
