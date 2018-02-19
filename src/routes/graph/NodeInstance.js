import React from 'react';
import fetch from 'isomorphic-fetch';
import PropertyFormElement from '../templates/components/property_form_element';
import MatUiAutosuggest from '../templates/components/MatUiAutosuggest';

export default class NodeInstance extends React.Component {
  state = {
    autocompleteResults: [],
    mode: "new" // this will likely be passed down in props? or maybe even initialized?
  }

  onChange = ({value}) => {
    fetch("http://localhost:3000/graph_models/templates_by_label?label=" + value)
    .then(response => response.json())
    .then(data => this.setState({ autocompleteResults: data }))
  }

  onSelect = (evt, {suggestionValue}) => {
    fetch("http://localhost:3000/graph_models/template?label=" + suggestionValue)
    .then(response => response.json())
    .then(data => this.setState({ template: data }))
  }

  onNewButtonClick = () => {
    fetch("http://localhost:3000/graph_models/template?label=" + (this.props.label || this.state.specificTypeLabel))
    .then(response => response.json())
    .then(data => this.setState({ template: data }))
  }

  render() {

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
          property = { property }
          handlePropertyChange = { this.props.handlePropertyChange(index) }/>
      })
    } else {
      nodeSearch = (
        <div>
          <MatUiAutosuggest
            handleSuggestionsFetchRequested={this.onChange}
            onSuggestionSelected={this.onSelect}
            suggestions={this.state.autocompleteResults}
            getSuggestionValue={(item) => item}
            renderMenuItem={(item) => {
              return (
                <div>
                  {item}
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

    return (
      <div className = "property_element">
        { nodeSearch }
        { newNodeTemplate }
      </div>
    )
  }
}
