import React from 'react';
import Autocomplete from '../entities/components/custom-autocomplete';
import fetch from 'isomorphic-fetch';
import PropertyFormElement from '../templates/components/property_form_element';
import GraphInstance from './GraphInstance';
import GraphTemplate from './GraphTemplate';

export default React.createClass({

  componentWillMount: function () {
    if (this.props.instance.type) {
      fetch("http://localhost:3000/graph_models/templates_by_type?type=" + this.props.instance.type)
      .then(response => response.json())
      .then(data => this.setState({ types: data }))
    }
  },

  getInitialState: function () {
    return {
      autocompleteResults: [],
      template: {},
      types: [],
      specificTypeLabel: null
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

  // onNewButtonClick: function () {
  //   this.(this.props.label || this.state.specificTypeLabel))
  //   .then(response => response.json())
  //   .then(data => this.setState({ template: data }))
  // },

  onGraphChooserSelectChange: function (event) {
    //only sets value after a change, we need to initialize?  maybe use "all" as initial value
    this.setState({ specificTypeLabel: event.target.value })
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

    let graphChooser, template;

    if (this.props.instance.type) {
      graphChooser = (
        <div style = { styles.graphChooser }>
          <select
            style = { styles.graphChooser_select }
            onChange = { this.onGraphChooserSelectChange }>
            { this.state.types.map((type_label, index) => {
              return <option key = { index }>{ type_label }</option>
            }) }
          </select>
        </div>
      )
    }

    if (this.state.template) {
      template = <GraphTemplate template = { this.state.template }/>
    }

    return (
      <div className = "property_element">
        <label>{ this.props.instance.label || this.props.instance.type }:</label>
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
        { graphChooser }
        <div
          style = { styles.newButton }
          onClick = { this.props.onAddNewButtonClick(this.props.label || this.state.specificTypeLabel) }>
          +
        </div>
        { template }
      </div>
    )
  }
})
