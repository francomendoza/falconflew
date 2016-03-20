import React from 'react';
import Autocomplete from '../entities/components/custom-autocomplete';
import fetch from 'isomorphic-fetch';
import PropertyFormElement from '../templates/components/property_form_element';
import GraphInstance from './GraphInstance';
import GraphTemplate from './GraphTemplate';
import clone from 'clone';

export default React.createClass({

  getInitialState: function () {
    return {
      autocompleteResults: [],
      template: {},
      currentTemplateInstanceId: null,
      templateInstancesByInstanceId: {},
      templates: []
    }
  },

  onChange: function (event, value) {
    fetch("http://localhost:3000/graph_models/templates_by_label?label="+value)
    .then(response => response.json())
    .then(data => this.setState({ autocompleteResults: data }))
  },

  onSelect: function (value, item) {
    let templates = this.state.templates,
    templateInstancesByInstanceId = this.state.templateInstancesByInstanceId,
    currentTemplateInstanceId;
    fetch("http://localhost:3000/graph_models/template?label="+value)
    .then(response => response.json())
    .then(data => {
      templates.push(data)
      let newTemplateInstance = clone(data),
      newTemplateInstanceId = "x0";
      newTemplateInstance.templateInstanceId = newTemplateInstanceId;
      currentTemplateInstanceId = newTemplateInstanceId;
      templateInstancesByInstanceId[newTemplateInstanceId] = newTemplateInstance;
      this.setState({ templates, templateInstancesByInstanceId, currentTemplateInstanceId })
    })
  },

  onAddNewButtonClick: function (graphInstanceLabel, graphInstanceIndex, parentTemplateInstanceId) {
    return (event) => {
      let templates = this.state.templates,
      templateInstancesByInstanceId = this.state.templateInstancesByInstanceId,
      currentTemplateInstanceId;
      // check if template is already in cache, if so dont make new request
      fetch("http://localhost:3000/graph_models/template?label=" + graphInstanceLabel)
      .then(response => response.json())
      .then(data => {
        templates.push(data)
        // instanceIdGenerator() x0+0
        let newTemplateInstance = clone(data);
        let newTemplateInstanceId = graphInstanceLabel;
        currentTemplateInstanceId = newTemplateInstanceId;
        newTemplateInstance.templateInstanceId = newTemplateInstanceId;
        templateInstancesByInstanceId[newTemplateInstanceId] = newTemplateInstance;
        templateInstancesByInstanceId[parentTemplateInstanceId].graph_instances[graphInstanceIndex]["templateInstanceId"] = newTemplateInstanceId;
        this.setState({ templates, templateInstancesByInstanceId, currentTemplateInstanceId })
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

    // if (this.state.templates.length > 0) {
    //   templates = this.state.templates.map((template, index) => {
    //     return <GraphTemplate
    //       key = { index }
    //       template = { template }
    //       onAddNewButtonClick = { this.onAddNewButtonClick }/>
    //   })
    // }

    if (this.state.currentTemplateInstanceId) {
      templates = <GraphTemplate
        template = { this.state.templateInstancesByInstanceId[this.state.currentTemplateInstanceId] }
        onAddNewButtonClick = { this.onAddNewButtonClick }/>
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
