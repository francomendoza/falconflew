import React from 'react';
import Autocomplete from '../entities/components/custom-autocomplete';
import fetch from 'isomorphic-fetch';
import PropertyFormElement from '../templates/components/property_form_element';
import GraphInstance from './GraphInstance';
import GraphTemplate from './GraphTemplate';
import GraphChooser from './GraphChooser';
import clone from 'clone';

export default React.createClass({

  getInitialState: function () {
    return {
      autocompleteResults: [],
      template: {},
      currentTemplateInstanceId: null,
      templateInstancesByInstanceId: {},
      templates: [],
      hiddenTemplates: [],
      graphChooser: null
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
      currentTemplateInstanceId,
      hiddenTemplates = this.state.hiddenTemplates;
      hiddenTemplates.push(templateInstancesByInstanceId[parentTemplateInstanceId].label)
      this.setState({ hiddenTemplates })
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

  onAddNewButtonClickType: function (type, graphInstanceIndex, parentTemplateInstanceId) {
    this.setState({ graphChooser: { type, graphInstanceIndex, parentTemplateInstanceId }, currentTemplateInstanceId: null });
  },

  onGraphChooserSelect: function (graphInstanceIndex, parentTemplateInstanceId) {
    return (event) => {
      this.onAddNewButtonClick(event.target.value, graphInstanceIndex, parentTemplateInstanceId)()
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
      hiddenTemplateBar: {
        height: "50px",
        padding: "15px",
        backgroundColor: "aquamarine"
      }
    },
    template, hiddenTemplates, graphChooser;

    if (this.state.currentTemplateInstanceId) {
      template = <GraphTemplate
        template = { this.state.templateInstancesByInstanceId[this.state.currentTemplateInstanceId] }
        onAddNewButtonClickType = { this.onAddNewButtonClickType }
        onAddNewButtonClick = { this.onAddNewButtonClick }/>
    }

    if (this.state.graphChooser) {
      graphChooser = <GraphChooser
        graphChooser = { this.state.graphChooser }
        onGraphChooserSelect = { this.onGraphChooserSelect } />
    }

    if (this.state.hiddenTemplates.length > 0) {
      hiddenTemplates = this.state.hiddenTemplates.map((hiddenTemplate, index) => {
        return (
          <div
            key = { index }
            style = { styles.hiddenTemplateBar }>
            { /*this.state.templateInstancesByInstanceId[hiddenTemplate].label*/ hiddenTemplate }
          </div>
        )
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
        { hiddenTemplates }
        { graphChooser }
        { template }
      </div>
    )
  }
})
