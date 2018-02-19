import React from 'react';
import MatUiAutosuggest from '../../templates/components/MatUiAutosuggest';

export default class StaticSearchHeaderCell extends React.Component {

  matchItemToTerm = ({value}) => {
    return this.props.dataSource.filter((suggestion) => {
      return suggestion.node.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  renderItems = (renderedItems, items) => {
    let menuMappedItems = [],
      categories = [];
    items.forEach((item, index) => {
      if (!categories.includes(item.related_to)) {
        categories.push(item.related_to)
        var style = {
          background: '#eee',
          color: '#454545',
          padding: '2px 6px',
          fontWeight: 'bold'
        }
        menuMappedItems.push(<div style = { style } key = { item.related_to }>{ item.related_to }</div>)
        menuMappedItems.push(renderedItems[index])
      } else {
        menuMappedItems.push(renderedItems[index])
      }
    })
    return menuMappedItems;
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
      <MatUiAutosuggest
        onSuggestionSelected={this.props.onSelect}
        handleSuggestionsFetchRequested={this.matchItemToTerm}
        getSuggestionValue={(item) => item.node}
        suggestions={this.props.dataSource}
        renderMenuItem={(item) => {
          return <div
            key = { item.node + item.related_to }>
            { item.node }
          </div>
        } }
      />
    </th>
  }
}
