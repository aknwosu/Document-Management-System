import React from 'react';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {getAllRolesAction, updateRolesAction} from '../../actions/rolesAction';

class AllRoles extends React.Component {
  constructor(props) {
    super(props);
    this.props.getAllRolesAction();

    this.state = {
      title: 'ddd',
      roleId: undefined
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
  }

  updateDocument(){
    updateRolesAction(this.state)
  }

  onClick(event) {
    debugger;
    event.preventDefault();
    const selectedId = event.currentTarget.getAttribute('data-id');
    console.log('selectedId', selectedId)
    console.log('event.currentTarget.getAttribute', event.currentTarget.getAttribute('data-id'))
    const role = this.props.roles.filter(role => role.id == selectedId);
    console.log(role, "role")
    this.setState({ title: role[0].title });
    $('.modal').modal('open');
  }

  onChange(event){
    event.preventDefault();
    this.setState({title: event.target.value, roleId: this.props.currentRole.id})
  }

  render() {
    const { roles } = this.props;
    console.log("all roles", roles);
    const mappedRoles = roles.map((role, index) => 
      <a
        className="card-panel"
        key={role.id} 
        data-id={role.id}
        onClick={this.onClick}
      >
        {role.title}
      </a>
    );

    return (
      <div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <input
              value={this.state.title}
              onChange={this.onChange}
            />
          </div>
          <div className="modal-footer">
            <button
              onClick={this.updateRole}
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Update
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
  return {
    roles: state.rolesReducer.allRoles,
    currentRole: state.rolesReducer.currentRole
}
}

const mapDispatchToProps = {
  getAllRolesAction,
  updateRolesAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRoles);