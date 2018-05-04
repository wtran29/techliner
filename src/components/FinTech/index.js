import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import list from '../../list';
import { Grid, Row } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { DEFAULT_QUERY, DEFAULT_PAGE, DEFAULT_HPP, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP} from '../../constants/index';
// import { sortBy } from 'lodash';
import Table from '../Table/index';
import { Button, Loading } from '../Button/index';
// import Search from '../Search/index';


// const url = PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + DEFAULT_QUERY;
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;
console.log(url);

// filter the results by search
// function isSearched(searchTerm){
//   return function(item){
//     return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())
//   }
// }

// higher order component
const withLoading = (Component) => ({ isLoading, ...rest }) => 
  isLoading ? <Loading /> : <Component { ...rest } />

const updateTopStories = (hits, page)=> prevState =>{
  const { searchKey, results } = prevState;

  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];
  
  return { results: { ...results, [searchKey]: {hits: updatedHits, page}}, isLoading: false }

}

class FinTech extends Component {
  // setting up internal component state
  // ES6 class can use constructor to initialize internal state

  constructor(props){
    // super props sets this.props to the constructor
    super(props);

    // setting up state
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: 'fintech',
      isLoading: false,
    }
    // **important** bind the functions to this (app component)
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.getTopStories = this.getTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkTopStoriesSearchTerm = this.checkTopStoriesSearchTerm.bind(this);
    
  }


  
  // check top stories search term
  checkTopStoriesSearchTerm(searchTerm){
    return !this.state.results[searchTerm];
  }

  // set top stories
  setTopStories(result){
    // get hits and page from result
    const { hits, page } = result;

    this.setState(updateTopStories(hits, page));
  }
  // get top stories
  getTopStories(searchTerm, page){

    this.setState({ isLoading: true });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setTopStories(result))
      .catch( e => e);
  }

  // component did mount function
  componentDidMount(){
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm});
    this.getTopStories(searchTerm, DEFAULT_PAGE);
  }

  // on search submit function
  onSubmit(event){
    event.preventDefault();
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm});

    if(this.checkTopStoriesSearchTerm(searchTerm)){
      this.getTopStories(this.state.searchTerm, DEFAULT_PAGE);
    }
  }
  // remove item function
  // removeItem(id){
  //   console.log('Remove Item');
  //   // using javascript filter method
  //   // we can filter out the clicked item and render the updated list
  //   function isNotID(item){
  //     return item.objectID !== id;
  //   }
  //   // create a new updated list
  //   const updatedList = this.state.list.filter(isNotID);
  //   // assign the new updated list to the list using setState method
  //   this.setState({ list: updatedList })
  // }

// lets's rewrite removeItem function in ES6
removeItem(id){
  const { results, searchKey } = this.state;
  const { hits, page } = results[searchKey];
  // const isNotId = item => item.objectID !== id;
  const updatedList = hits.filter(item => item.objectID !== id);
  // Object Assign
  // this.setState({ result: Object.assign({}, this.state.result, {hits: updatedList}) })
  // Spread Operator
  this.setState({ results: {...results, [searchKey]: {hits: updatedList, page}} });
}
// get input field value from search form
searchValue(event){
  console.log('from search...')
  console.log(event)
  this.setState({ searchTerm: event.target.value })
}

  render() {

    const { results, searchTerm, searchKey, isLoading } = this.state;
    // if(!result){
    //   return null;
    // }

    const page = (results && results[searchKey] && results[searchKey].page) || 0;

    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    console.log(this);

    return (
      <div>
          
        <Grid>
          <Row>
            <Table 
              list = { list }
              removeItem = { this.removeItem }
            />

            <div className="text-center alert">
              
                <ButtonWithLoading
                  isLoading={ isLoading }
                  className="btn btn-success"
                  onClick={ ()=> this.getTopStories(searchTerm, page + 1) }>
                  Load more
                </ButtonWithLoading>
              

            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}







const ButtonWithLoading = withLoading(Button);

export default FinTech;
