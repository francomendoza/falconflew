import React from 'react';
import fetch from 'isomorphic-fetch';
import SearchCell from './SearchCell';

export default class SearchRow extends React.Component {
  state = {
    searchResults: [],
    queryString: ""
  }

  onChange = (nodeLabel) => {
    return (event, value) => {
      this.setState({ queryString: value }); //is this necessary?
      // allows Autocomplete to handle its own data including the API request
      fetch(`http://localhost:3000/entities/autocomplete?node_label=${nodeLabel}&match_type=exact&term=${value}`)
        .then(response => response.json())
        .then(data => this.setState({ searchResults: data }))
    }
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

    return <tr>
      { this.props.nodeSections.map((nodeSection, index) => {
        return <SearchCell
          key = { index }
          colspan = { nodeSection.properties.length }
          endpoint = { `http://localhost:3000/entities/autocomplete?node_label=${nodeSection.node}&match_type=exact&term=` }
          onSelect = { this.props.onSearchCellSelect }
          renderItem = { (item, isHighlighted) => {
            return <div
              style = { isHighlighted ? styles.highlightedItem : styles.item }>
              { item.node_properties.map((property, index) => {
                return <div key = { index }>{ property.name }: { property.value }</div>
              }) }
            </div>
          } }/>
      }) }
    </tr>
  }
}
