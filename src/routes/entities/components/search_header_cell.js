import React from 'react';
import fetch from 'isomorphic-fetch';
import MatUiAutosuggest from '../../templates/components/MatUiAutosuggest';

export default class SearchHeaderCell extends React.Component {
  state = {
    searchResults: [],
    queryString: ""
  }

  onChange = ({value}) => {
    this.setState({ queryString: value }); //is this necessary?
    // allows Autocomplete to handle its own data including the API request
    // if (this.props.dataSource.length > 0) {
      // let searchResults = filter(this.props.dataSource, (obj) => {
      //   let matchString = new RegExp(value)
      //   return matchString.test(obj.node)
      // })
      // this.setState({searchResults})
    // } else {
      let tableNodes = this.props.nodeSections.map((nodeSection) => {
        return nodeSection.node;
      })
      let request = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(tableNodes)
      }
      fetch("http://localhost:3000/node_models/autocomplete?value="+value)
      .then(response => response.json())
      .then(data => this.setState({ searchResults: data }))
    // }
  }

  render() {
    return (
      <th>
        <MatUiAutosuggest
          handleSuggestionsFetchRequested={this.onChange}
          onSuggestionSelected={this.props.onSelect}
          getSuggestionValue={(suggestion) => suggestion.label}
          suggestions={this.state.searchResults}
          renderMenuItem={(suggestion) => {
            return <div>{suggestion.label}</div>
          }}
        />
      </th>
    );
  }
}
