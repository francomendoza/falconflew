import React from 'react';
import fetch from 'isomorphic-fetch';
import MatUiAutosuggest from '../templates/components/MatUiAutosuggest';

export default class GraphInstance extends React.Component {
  state = {
    autocompleteResults: []
  }

  onChange = ({value}) => {
    let url;
    if (this.props.instance.type) {
      url = "http://localhost:3000/graphs/search?type=" + this.props.instance.type + "&term=" + value
    } else if (this.props.instance.label) {
      url = "http://localhost:3000/graphs/search?label=" + this.props.instance.label + "&term=" + value
    }
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ autocompleteResults: data }))
  }

  onSelect = (value, item) => {

  }

  onNewButtonClick = () => {
    if (this.props.instance.type) {
      // render graph chooser
      this.props.onAddNewButtonClickType(this.props.instance.type, this.props.graphInstanceIndex, this.props.parentTemplateInstanceId)
    } else if (this.props.instance.label) {
      // render template
      this.props.onAddNewButtonClick(this.props.instance.label, this.props.graphInstanceIndex, this.props.parentTemplateInstanceId)
    }
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
      }
    }

    return (
      <div className = "property_element">
        <MatUiAutosuggest
          handleSuggestionsFetchRequested={this.onChange}
          onSuggestionSelected={this.props.onGraphInstanceSelect}
          suggestions={this.state.autocompleteResults}
          getSuggestionValue={(item) => item.elastic_id}
          inputProps={{
            label: this.props.instance.label || this.props.instance.type
          }}
          renderMenuItem = { (item) => {
            let properties = item.node_instances[0].properties
            return (
              <div>
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
}
