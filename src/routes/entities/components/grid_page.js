import React from 'react';
import Table from './table';
import SearchHeaderCell from './search_header_cell';
import fetch from 'isomorphic-fetch';

var GridPage = React.createClass({

  getInitialState: function () {
    return {
      nodeSections: [
        // {
        //   node: "Sample",
        //   properties: [
        //     {
        //       displayName: "Name",
        //       propertyKey: "name",
        //       displayed: true
        //     },
        //     {
        //       displayName: "Description",
        //       propertyKey: "description",
        //       displayed: true
        //     }
        //   ]
        // }
      ],
      data: [],
      headerAutocompleteOptions: [],
      relationships: []
    }
  },

  addHeader: function () {
    let columnHeaders = this.state.columnHeaders
    let spliceIndex = columnHeaders.length - 1
    columnHeaders.splice(spliceIndex, 0, {type: "node_model_search"});
    this.setState({ columnHeaders })
  },

  onHeaderSelect: function (columnIndex) {
    return (evt, {suggestionValue, suggestion}) => {
      let nodeSections = this.state.nodeSections
      let item = suggestion;
      let properties = item.node_properties.map((node_property) => {
        return {
          displayName: node_property.name,
          propertyKey: node_property.name,
          displayed: true
        }
      })
      nodeSections[nodeSections.length] = {
        node: item.label,
        properties
      }
      let mappedRelatedNodes = item.related.map((related_node) => {
        return {
          node: related_node,
          related_to: item.label //likely need another specific identifier in case multiple nodes exist
        }
      })
      let headerAutocompleteOptions = this.state.headerAutocompleteOptions.concat(mappedRelatedNodes)

      this.setState({ nodeSections, headerAutocompleteOptions })
    }
  },

  onRelatedNodeSelect: function (value, item) {
    fetch('http://localhost:3000/node_models/label?value='+value)
    .then(response => response.json())
    .then(data => {
      let nodeSections = this.state.nodeSections
      let properties = data.node_properties.map((node_property) => {
        return {
          displayName: node_property.name,
          propertyKey: node_property.name,
          displayed: true
        }
      })
      nodeSections[nodeSections.length] = {
        node: data.label,
        properties
      }
      let mappedRelatedNodes = data.related.map((related_node) => {
        return {
          node: related_node,
          related_to: data.label //likely need another specific identifier in case multiple nodes exist
        }
      })
      let headerAutocompleteOptions = this.state.headerAutocompleteOptions.concat(mappedRelatedNodes)
      let relationships = this.state.relationships
      relationships.push(item)
      this.setState({ nodeSections, headerAutocompleteOptions, relationships })
    })
  },

  onSearchCellSelect: function (value, item) {
    let data = this.state.data
    let row = {}
    let request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({
        head_node: item,
        relationships: this.state.relationships
      })
    }
    fetch('http://localhost:3000/node_models/grid_search', request)
    .then(response => response.json())
    .then(dataResponse => {
      dataResponse.map((node) => {
        let obj = {}
        node.node_properties.map((node_property) => {
          return obj[node_property.name] = node_property.value
        })
        row[node.node_label[0]] = obj
      })
      data.push(row)
      this.setState({ data })
    })

  },

  render: function() {
    return <Table
      tableData = { this.state.data }
      onHeaderSelect = { this.onHeaderSelect }
      onSearchCellSelect = { this.onSearchCellSelect }
      headerAutocompleteOptions = { this.state.headerAutocompleteOptions }
      onRelatedNodeSelect = { this.onRelatedNodeSelect }
      nodeSections = { this.state.nodeSections } />
  }

})

export default GridPage;
