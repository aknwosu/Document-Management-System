import React from 'react';
import jwt from 'jsonwebtoken';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {createDocAction, searchBoxAction} from '../../actions/documentAction';
import {getUserDocsAction} from '../../actions/userAction';

class UserDocuments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: jwt.decode(localStorage.getItem('token')).userId,
  
    userDoc: this.props.getUserDocsAction(jwt.decode(localStorage.getItem('token')).userId)
  };
    }
    
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  
   componentWillMount() {
     this.setState({responsedoc: this.props.getUserDocsAction(this.state.userId)}) ;
    
  }

  render() {
    console.log("imma state", this.state)
        // console.log("imma prop", this.props.userDoc)

    const { userDocuments } = this.props;
    console.log("this.props.userdocuments", this.props.userDocuments);
    // const mappedDocs = documents.map((document) =>
    <li className="card-panel" key={this.state.userId}>
      {this.props.userDocuments}
    </li>
    return (

      <div>
      <ul>
        <p>{this.props.userDocuments}</p>
         <p>No Documents Here</p>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {userDocuments: state.userReducer.userDocs.documents
  }

}

const mapDispatchToProps = {
  getUserDocsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDocuments);