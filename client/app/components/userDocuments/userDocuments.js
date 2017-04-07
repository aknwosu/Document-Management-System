import React from 'react';
import jwt from 'jsonwebtoken';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {createDocAction, searchBoxAction} from '../../actions/documentAction';
import {getUserDocsAction} from '../../actions/userAction';
import {Link} from 'react-router';

class UserDocuments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: jwt.decode(localStorage.getItem('token')).userId,
  
    // userDoc: this.props.getUserDocsAction(jwt.decode(localStorage.getItem('token')).userId)
  };
    }
    
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  
   componentWillMount() {
     this.props.getUserDocsAction(this.state.userId)
    //  this.setState({responsedoc: this.props.getUserDocsAction(this.state.userId)}) ;
    
  }

  render() {
    console.log(this.props.userDocuments);

    const mappedDocs = this.props.userDocuments.map((document) =>
    <li className="card-panel" key={document.id}>
      <Link to={`/documents/${document.id}`}>
        {document.title}
      </Link>
    </li>);

    return (
      <div>
        <ul>
          {mappedDocs || <p>No Documents Here</p>}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {userDocuments: state.userReducer.userDocs.documents

  }

}

const mapDispatchToProps = {
  getUserDocsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDocuments);