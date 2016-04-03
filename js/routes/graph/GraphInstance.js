import React from 'react';
import Autocomplete from '../entities/components/custom-autocomplete';
import fetch from 'isomorphic-fetch';
import PropertyFormElement from '../templates/components/property_form_element';
import GraphInstance from './GraphInstance';
import GraphTemplate from './GraphTemplate';

export default React.createClass({

  getInitialState: function () {
    return {
      autocompleteResults: []
    }
  },

  onChange: function (event, value) {
    let url;
    if (this.props.instance.type) {
      url = "http://localhost:3000/graphs/search?type=" + this.props.instance.type + "&term=" + value
    } else if (this.props.instance.label) {
      url = "http://localhost:3000/graphs/search?label=" + this.props.instance.label + "&term=" + value
    }
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ autocompleteResults: data }))
  },

  onSelect: function (value, item) {
    fetch("http://localhost:3000/graph_models/template?label=" + value)
    .then(response => response.json())
  //  .then(data => this.setState({ template: data }))
  },

  onNewButtonClick: function () {
    if (this.props.instance.type) {
      // render graph chooser
      this.props.onAddNewButtonClickType(this.props.instance.type, this.props.graphInstanceIndex, this.props.parentTemplateInstanceId)
    } else if (this.props.instance.label) {
      // render template
      this.props.onAddNewButtonClick(this.props.instance.label, this.props.graphInstanceIndex, this.props.parentTemplateInstanceId)
    }

  },

  render: function () {

    let styles = {
      highlightedItem: {
        backgroundColor: "lightgray"
      },
      item: {
        backgroundColor: "white"
      },
      newButton: {
        display: "inline-block",
        fontSize: "20px",
        fontWeight: "bold"
      }
    }

    return (
      <div className = "property_element">
        <label>{ this.props.instance.label || this.props.instance.type }:</label>
        <Autocomplete
          onChange = { this.onChange }
          onSelect = { this.onSelect }
          items = { this.state.autocompleteResults }
          getItemValue = { (item) => { return item.elastic_id } }
          renderItem = { (item, isHighlighted) => {
            let properties = item.node_instances[0].properties
            return (
              <div
                style = { isHighlighted ? styles.highlightedItem : styles.item }>
                { Object.keys(properties).map((propertyKey, index) => {
                  return <div key = { index }>{ propertyKey + ": " + properties[propertyKey] }</div>
                }) }
              </div>
            )
          } }
        />
        <div
          style = { styles.newButton }
          onClick = { this.onNewButtonClick }>
          +
        </div>
      </div>
    )
  }
})
