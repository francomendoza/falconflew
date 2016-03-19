import React from 'react';
import Autocomplete from '../entities/components/custom-autocomplete';
import fetch from 'isomorphic-fetch';
import PropertyFormElement from '../templates/components/property_form_element';
import GraphInstance from './GraphInstance';
import GraphTemplate from './GraphTemplate';

export default React.createClass({

  getInitialState: function () {
    return {
      autocompleteResults: [],
      template: {},
      templates: []
    }
  },

  onChange: function (event, value) {
    fetch("http://localhost:3000/graph_models/templates_by_label?label="+value)
    .then(response => response.json())
    .then(data => this.setState({ autocompleteResults: data }))
  },

  onSelect: function (value, item) {
    let templates = this.state.templates
    fetch("http://localhost:3000/graph_models/template?label="+value)
    .then(response => response.json())
    .then(data => {
      templates.push(data)
      this.setState({ templates: templates })
    })
  },

  // recursive: function () {
  //   this.state.templates.map((template) => {
  //
  //   })
  // },

  onAddNewButtonClick: function (label) {
    return (event) => {
      let templates = this.state.templates;
      fetch("http://localhost:3000/graph_models/template?label=" + label)
      .then(response => response.json())
      .then(data => {
        templates.push(data)
        this.setState({ templates })
      })
    }
  },

  render: function () {
    let styles = {
      highlightedItem: {
        backgroundColor: "lightgray"
      },
      item: {
        backgroundColor: "white"
      }
    },
    templates;

    if (this.state.templates.length > 0) {
      templates = this.state.templates.map((template, index) => {
        return <GraphTemplate
          key = { index }
          template = { template }
          onAddNewButtonClick = { this.onAddNewButtonClick }/>
      })
    }

    return (
      <div>
        <Autocomplete
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
        { templates }
      </div>
    )
  }
})
