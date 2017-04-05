import React from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createDocAction, searchBoxAction } from '../../actions/documentAction';

class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const changeProps = {};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
    console.log('state', this.state.SearchBox);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchBoxAction(this.state.searchTerm)
  }


    render() {
      console.log("issa props", this.props.searchResult);
      console.log("issa props", this.state.searchResult);
      return (
        
        <div>

        <div className="row">
        <div className="card">
          <div className="row">
            <div className="input-field col m8"  onChange={this.handleChange} >
            <input type="text" name='searchTerm' value={this.state.searchTerm} label="searchBox" />
            </div>
              
          </div>
          <button className="waves-effect btn" onClick={this.handleSubmit} type="button" value="submit">Search</button>
        </div>
        </div>
          <div className="card">{this.props.searchResult}</div>
        </div>
      );
    } 
}
const mapStateToProps = (state, ownProps) => {
  console.log("searchResult", state.documentReducer.searchBox);
  return {
    searchResult: state.documentReducer.searchBox
  }
}

const  mapDispatchToProps = {
    searchBoxAction
  }

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);