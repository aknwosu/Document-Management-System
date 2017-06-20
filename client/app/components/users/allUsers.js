import React from 'react';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import ReactTable from 'react-table';

import {getAllUsersAction} from "../../actions/userAction";

class AllUsers extends React.Component {
 constructor(props) {
    super(props);
  }

  componentDidMount() {
    //
    this.props.getAllUsersAction();
  }

  render() {
    const data = this.props.users;
    const columns = [{
      header: 'id',
      accessor: 'id'
    }, {
      header: 'Username',
      accessor: 'username'
    }, {
      header: 'First Name',
      accessor: 'firstname'
    }, {
      header: 'Last Name',
      accessor: 'lastname'
    }, {
      header: 'Email',
      accessor: 'email'
    } ]
    
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <ReactTable data={data} columns={columns} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {users: state.userReducer.users,
  }
}

const mapDispatchToProps = {
 getAllUsersAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);