import React from 'react';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {getAllRolesAction, updateRolesAction, deleteRoleAction} from '../../actions/rolesAction';

class AllRoles extends React.Component {
  constructor(props) {
    super(props);
    this
      .props
      .getAllRolesAction();

    this.state = {
      title: 'ddd',
      roleId: undefined
    }
    this.onChange = this
      .onChange
      .bind(this);
    this.onClick = this
      .onClick
      .bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
  }

  updateRole() {
    updateRolesAction(this.state)
  }
  deleteRole() {
  }

  onClick(event) {
    event.preventDefault();
    const selectedId = event
      .currentTarget
      .getAttribute('data-id');
    const role = this
      .props
      .roles
      .filter(role => role.id == selectedId);
    this.setState({title: role[0].title});
    $('.modal').modal('open');
  }

  onChange(event) {
    event.preventDefault();
    this.setState({title: event.target.value, roleId: this.props.currentRole.id})
  }

  render() {
    const {roles} = this.props;
    const mappedRoles = roles.map((role, index) => 
    <a
      className="card-panel"
      key={role.id}
      data-id={role.id}
      onClick={this.onClick}>
      {role.title}
    </a>);

    return (
      <div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <input value={this.state.title} onChange={this.onChange}/>
          </div>
          <div className="modal-footer">
            <button
              onClick={this.updateRole}
              className="modal-action modal-close waves-effect waves-green btn-flat">
              Update
            </button>
            <button
              onClick={this.deleteRole}
              className="modal-action modal-close waves-effect waves-green btn-flat">
              Delete
            </button>
          </div>
        </div>
        <ul>
          {mappedRoles || <p>No Roles Here</p>}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {roles: state.rolesReducer.allRoles, currentRole: state.rolesReducer.currentRole}
}

const mapDispatchToProps = {
  getAllRolesAction,
  updateRolesAction,
  deleteRoleAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRoles);