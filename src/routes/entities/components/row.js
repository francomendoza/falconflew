import React from 'react';
import Autocomplete from 'react-autocomplete';
import fetch from 'isomorphic-fetch';

export default class Row extends React.Component {
  state = {
    searchResults: [],
    queryString: ""
  }

  onChange = (columnIndex) => {
    return (event, value) => {
      this.setState({ queryString: value }); //is this necessary?
      // allows Autocomplete to handle its own data including the API request
      fetch(`http://localhost:3000/entities/autocomplete?node_label=${this.props.columnHeaders[columnIndex].node}&match_type=exact&term=${value}`)
        .then(response => response.json())
        .then(data => this.setState({ searchResults: data }))
      }
  }

  onSelect = () => {

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
      { this.props.nodeSections.map((columnHeader, index) => {
        if (columnHeader.node) {
          if (this.props.rowData[columnHeader.node].value) {
            return <td key = { index + columnHeader.node }>{ this.props.rowData[columnHeader.node].value }</td>
          } else if (this.props.rowData[columnHeader.node].search) {
            return <td key = { index }><Autocomplete
              onChange = { this.onChange(index) }
              onSelect = { this.onSelect }
              getItemValue = { (item) => item.node_label[0] }
              items = { this.state.searchResults }
              renderItem = { (item, isHighlighted) => {
                return <div
                  style = { isHighlighted ? styles.highlightedItem : styles.item }>
                  { item.node_properties.map(function(property, index){
                    return <div key = { index }>{ property.name }: { property.value }</div>
                  }) }
                </div>
              } }
            /></td>
          }
        } else {
          return <td key = { index }>EMPTY</td>
        }
      }) }
    </tr>
  }
}
