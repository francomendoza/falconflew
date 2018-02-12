import React from 'react';
import Autocomplete from './custom-autocomplete';
import fetch from 'isomorphic-fetch';

export default class SearchHeaderCell extends React.Component {
  state = {
    searchResults: [],
    queryString: ""
  }

  onChange = (event, value) => {
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
    let styles = {
      highlightedItem: {
        backgroundColor: "lightgray"
      },
      item: {
        backgroundColor: "white"
      }
    }

    return <th>
      <Autocomplete
        onChange = { this.onChange }
        onSelect = { this.props.onSelect }
        getItemValue = { (item) => { return item.label } }
        items = { this.state.searchResults }
        renderItem = { (item, isHighlighted) => {
          return <div
            style = { isHighlighted ? styles.highlightedItem : styles.item }>
            { item.label }
          </div>
        } }
      />
    </th>
  }
}
