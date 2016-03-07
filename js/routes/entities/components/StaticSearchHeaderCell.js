import React from 'react';
import Autocomplete from './custom-autocomplete';
import fetch from 'isomorphic-fetch';
import { filter } from 'lodash';

export default React.createClass({

  matchItemToTerm: function (item, value) {
    return (
      item.node.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  },

  renderItems: function (renderedItems, items) {
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

    return <th>
      <Autocomplete
        onSelect = { this.props.onSelect }
        getItemValue = { (item) => item.node }
        shouldItemRender={ this.matchItemToTerm }
        items = { this.props.dataSource }
        renderItem = { (item, isHighlighted) => {
          return <div
            style = { isHighlighted ? styles.highlightedItem : styles.item }
            key = { item.node + item.related_to }>
            { item.node }
          </div>
        } }
        renderMenu = {(renderedItems, items, value, style) => (
            <div style={{...styles.menu, ...style, position: "fixed", overflow: "auto"}}>
              {value === '' ? (
                <div style={{padding: 6}}>Type name of related nodes</div>
              ) : renderedItems.length === 0 ? (
                <div style={{padding: 6}}>No matches for {value}</div>
              ) : this.renderItems(renderedItems, items)}
            </div>
          )}
      />
    </th>
  }

})
