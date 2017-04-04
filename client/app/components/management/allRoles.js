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
      title: Object.assign({}, props.currentRole).title,
      roleId: undefined
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
  }

  updateDocument(){
    updateRolesAction(this.state)
  }

  onClick(event) {
    event.preventDefault();
    this.props.getRole(this.props.id);
  }

  onChange(event){
    console.log(nextProps);
    event.preventDefault();
    this.setState({title: event.target.value, roleId: this.props.currentRole.id})
  }

  render() {
    const roles = this.props.getRolesSuccess;
    console.log("all roles", roles);
    const mappedRoles = roles.map((role, index) => <a className="card-panel" key={role.id} 
                                                      href="#modal1" onClick={this.onClick}>
      <Link>
        {role.title}
      </Link>
    </a>);

    return (
      <div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <input value="" placeholder="Enter Role Here"
              onChange={this.onChange} />
          </div>
          <div className="modal-footer">
            <a href="#!" onClick={this.updateDocument} className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
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
    getRolesSuccess: state.rolesReducer.allRoles,
    currentRole: state.rolesReducer.currentRole
}
}

const mapDispatchToProps = {
  getAllRolesAction,
  updateRolesAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRoles);