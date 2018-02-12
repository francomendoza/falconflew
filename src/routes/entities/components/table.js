import React from 'react';
import SearchHeaderCell from './search_header_cell';
import ColumnHeader from './ColumnHeader';
import SearchRow from './SearchRow';
import StaticSearchHeaderCell from './StaticSearchHeaderCell';

export default class Table extends React.Component {
  render() {
    let node_header = [],
      details_header = [],
      search_header_cell;

    this.props.nodeSections.forEach((nodeSection, nodeSectionIndex) => {
      node_header.push(<ColumnHeader
        key = { nodeSectionIndex }
        title = { nodeSection.node }
        colspan = { nodeSection.properties.length }/>)
      nodeSection.properties.forEach((property, index) => {
        details_header.push(<ColumnHeader
          key = { nodeSectionIndex + "" + index }
          title = { property.displayName } />)
      })
    })

    if(this.props.headerAutocompleteOptions.length === 0){
      search_header_cell = <SearchHeaderCell
        endpoint = { "http://localhost:3000/templates/templates_by_name?name=" }
        onSelect = { this.props.onHeaderSelect(this.props.nodeSections.length) }
        nodeSections = { this.props.nodeSections }/>
    } else {
      search_header_cell = <StaticSearchHeaderCell
        dataSource = { this.props.headerAutocompleteOptions }
        onSelect = { this.props.onRelatedNodeSelect }
        nodeSections = { this.props.nodeSections }/>
    }

    return <table className = { "table" }>
      <thead>
        <tr>
          { node_header }
          { search_header_cell }
        </tr>
        <tr>{ details_header }</tr>
      </thead>
      <tbody>
        { this.props.tableData.map((row, index) => {
          return <tr key = { index }>{ this.props.nodeSections.map((nodeSection) => {
            return nodeSection.properties.map((property, index) => {
              return <td key = { index }>{ row[nodeSection.node] ? row[nodeSection.node][property.propertyKey] : "" }</td>
            })
          })}</tr>
        }) }
        <SearchRow
          nodeSections = { this.props.nodeSections }
          onSearchCellSelect = { this.props.onSearchCellSelect }/>
      </tbody>
    </table>
  }
}
