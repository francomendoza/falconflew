import React from 'react';
import Table from './table';
import SearchHeaderCell from './search_header_cell';

var GridPage = React.createClass({

  getInitialState: function () {
    return {
      nodeSections: [
        {
          node: "Sample",
          details: [
            {
              displayName: "Alias",
              propertyKey: "alias",
              displayed: true
            },
            {
              displayName: "BCode",
              propertyKey: "barcode",
              displayed: true
            }
          ]
        }
      ]
  },

  addHeader: function () {
    let columnHeaders = this.state.columnHeaders
    let spliceIndex = columnHeaders.length - 1
    columnHeaders.splice(spliceIndex, 0, {type: "node_model_search"});
    this.setState({columnHeaders})
  },

  onHeaderSelect: function (columnIndex){
    return (value, item) => {
      let columnHeaders = this.state.columnHeaders
      columnHeaders[columnIndex] = {
        type: "node",
        node: value
      }
      this.setState({columnHeaders})
    }
  },

  render: function() {
    return <Table
      tableData = { [
        {
          Sample: {
            search: true
          },
          id: {
            value: "1"
          }
        },
        {
          Sample: {
            value: "hello"
          },
          id: {
            value: "2"
          }
        }
      ] }
      addHeader = { this.addHeader }
      onHeaderSelect = { this.onHeaderSelect }
      nodeSections = { this.state.nodeSections } />
  }

})

module.exports = GridPage;
