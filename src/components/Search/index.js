import React, { Component } from 'react';
import { FormGroup, Glyphicon} from 'react-bootstrap';
import { Button } from '../Button/index';

class Search extends Component{
  componentDidMount(){
    this.input.focus();
  }
  render(){
    const { onChange, value, children, onSubmit } = this.props;
    return(
      <form onSubmit={ onSubmit }>
      <FormGroup>
        <h1 style={{ fontWeight: 'bold', color: '#202020', opacity: '0.9999999' }}>{ children }</h1>
        <p style={{ fontStyle: 'italic', opacity: '0.9999999' }}>Your Source for Tech News</p>
        <hr style={{ border: '2px solid #202020', width: '100px', opacity: '0.9999999' }} />
        <div className="input-group">
        <input
          className="form-control width100 searchForm"
          type="text"
          onChange={ onChange }
          value={ value }
          ref={(focus) => {this.input = focus}}
        />

        <span className="input-group-btn">
          <Button
            className="btn btn-primary searchBtn"
            type="submit"
          >
          <Glyphicon className="searchIcon" glyph="search" />
            Search
          </Button>
        </span>
        </div>
      </FormGroup>
      </form>
    )
  }
}

export default Search;