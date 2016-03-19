import React from 'react';
import Autocomplete from '../entities/components/custom-autocomplete';
import fetch from 'isomorphic-fetch';
import PropertyFormElement from '../templates/components/property_form_element';

export default React.createClass({

  getInitialState: function () {
    return {
      autocompleteResults: [],
      mode: "new" // this will likely be passed down in props? or maybe even initialized?
    }
  },

  onChange: function (event, value) {
    fetch("http://localhost:3000/graph_models/templates_by_label?label=" + value)
    .then(response => response.json())
    .then(data => this.setState({ autocompleteResults: data }))
  },

  onSelect: function (value, item) {
    fetch("http://localhost:3000/graph_models/template?label=" + value)
    .then(response => response.json())
    .then(data => this.setState({ template: data }))
  },

  onNewButtonClick: function () {
    fetch("http://localhost:3000/graph_models/template?label=" + (this.props.label || this.state.specificTypeLabel))
    .then(response => response.json())
    .then(data => this.setState({ template: data }))
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
      },
      graphChooser: {
        display: "inline-block",
        width: "100px"
      },
      graphChooser_select: {
        width: "100px"
      }
    }

    let newNodeTemplate, nodeSearch;

    if (this.state.mode === "new") {
      newNodeTemplate = this.props.instance.node_properties.map((property, index) => {
        return <PropertyFormElement
          key = { index }
          property = { property } />
      })
    } else {
      nodeSearch = <Autocomplete
        onChange = { this.onChange }
        onSelect = { this.onSelect }
        items = { this.state.autocompleteResults }
        getItemValue = { (item) => { return item } }
        renderItem = { (item, isHighlighted) => {
          return (
            <div
              style = { isHighlighted ? styles.highlightedItem : styles.item }>
              { item }
            </div>
          )
        } }
      />
    }

    return (
      <div className = "property_element">
        <label>{ this.props.instance.label || this.props.instance.type }:</label>
        { nodeSearch }
        <div
          style = { styles.newButton }
          onClick = { this.onNewButtonClick }>
          +
        </div>
        { newNodeTemplate }
      </div>
    )
  }
})
