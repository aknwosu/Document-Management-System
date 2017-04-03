import React from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createDocAction, searchBoxAction } from '../../actions/documentAction';

class SearhBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBox: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const changeProps = {};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchBoxAction(this.state.searchBox)
  }


    render() {
      // console.log(this.props.user);
      return (
        <div>

        <div className="row">
        <div className="card">
          <div className="row">
            <div className="input-field col m8"  onChange={this.handleChange} >
            <input type="text" name='searchBox' value={this.state.searchBox} label="searchBox" />
            </div>
              
          </div>
          <button className="waves-effect btn" onClick={this.handleSubmit} type="button" value="submit">Search</button>
        </div>
        </div>
        </div>
      );
    } 
}
const mapStateToProps = (state, ownProps) => {
  return {
    searchBox_Success: state.documentReducer.searchBox_Success
  }
}

const  mapDispatchToProps = {
    searchBoxAction
  }

export default connect(mapStateToProps, mapDispatchToProps)(SearhBox);