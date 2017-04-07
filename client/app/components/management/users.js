import React from 'react';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router';

export default class AllUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {users} = this.props;
    const mappedUsers = documents.map((user) =>
    <li className="card-panel" key={user.id}>
      <Link to={`/users`}>
        {user.title}
      </Link>
    </li>);

    return (
      <div>
        <ul>
          {mappedUsers || <p>No User Here</p>}
        </ul>
      </div>
    );
  }
}
