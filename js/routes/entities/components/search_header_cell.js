import React from 'react';
import Autocomplete from 'react-autocomplete';
import fetch from 'isomorphic-fetch';

var SearchHeaderCell = React.createClass({

  getInitialState: function(){
    return {
      searchResults: [],
      queryString: ""
    }
  },

  onChange: function(event, value) {
    this.setState({ queryString: value }); //is this necessary?
    // allows Autocomplete to handle its own data including the API request
    fetch(this.props.endpoint + value)
      .then(response => response.json())
      .then(data => this.setState({ searchResults: data }))
  },

  render: function() {

    let styles = {
      highlightedItem: {
        backgroundColor: "lightgray"
      },
      item: {
        backgroundColor: "white"
      }
    }

    return <th style = { { padding: "10px", backgroundColor: "#002c6b" } }>
      <Autocomplete
        onChange = { this.onChange }
        onSelect = { this.props.onSelect }
        getItemValue = { (item) => item.node_label[0] }
        items = { this.state.searchResults }
        renderItem = { (item, isHighlighted) => {
          return <div
            style = { isHighlighted ? styles.highlightedItem : styles.item }>
            { item.node_label[0] }
          </div>
        } }
      />
    </th>
  }

})

module.exports = SearchHeaderCell;
