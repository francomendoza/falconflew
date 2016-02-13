import React from 'react';
import Row from './row';
import Autocomplete from 'react-autocomplete';
import fetch from 'isomorphic-fetch';
import SearchHeaderCell from './search_header_cell';
import ColumnAdder from './ColumnAdder';
import ColumnHeader from './ColumnHeader';

var Table = React.createClass({

  render: function() {

    return <table>
      <thead>
        <tr>{ this.props.columnHeaders.map((columnHeader, index) => {
          if (columnHeader.type === "node_model_search") {
            return <SearchHeaderCell
              key = { index }
              endpoint = { "http://localhost:3000/templates/templates_by_name?name=" }
              onSelect = { this.props.onHeaderSelect(index) } />
          } else if (columnHeader.type === "new_column") {
            return <ColumnAdder
              key = { index }
              onClick = { this.props.addHeader }/>
          } else if (columnHeader.type === "node") {
            return <ColumnHeader
              key = { index }
              column = { columnHeader }/>
          }
        }) }</tr>
      </thead>
      <tbody>
        { this.props.tableData.map((row, index) => {
          return <Row
            key = { index }
            columnHeaders = { this.props.columnHeaders }
            rowData = { row }/>
        }) }
      </tbody>
    </table>
  }
});

module.exports = Table;
