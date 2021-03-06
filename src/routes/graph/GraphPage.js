import React from 'react';
import fetch from 'isomorphic-fetch';
import GraphTemplate from './GraphTemplate';
import GraphChooser from './GraphChooser';
import clone from 'clone';
import GraphDisplay from './GraphDisplay';
import MatUiAutosuggest from '../templates/components/MatUiAutosuggest';

export default class GraphPage extends React.Component {
  state = {
    autocompleteResults: [],
    currentTemplateInstanceId: null,
    templateInstancesByInstanceId: {},
    templates: [],
    hiddenTemplates: [],
    graphChooser: null,
    graph: null
  }

  onChange = ({value}) => {
    fetch("http://localhost:3000/graph_models/templates_by_label?label="+value)
    .then(response => response.json())
    .then(data => this.setState({ autocompleteResults: data }))
  }

  onSelect = (evt, {suggestionValue}) => {
    let templates,
    templateInstancesByInstanceId = {},
    currentTemplateInstanceId;
    fetch("http://localhost:3000/graph_models/template?label="+suggestionValue)
    .then(response => response.json())
    .then(data => {
      templates = [data]
      let newTemplateInstance = clone(data),
      newTemplateInstanceId = "x0";
      newTemplateInstance.templateInstanceId = newTemplateInstanceId;
      currentTemplateInstanceId = newTemplateInstanceId;
      templateInstancesByInstanceId[newTemplateInstanceId] = newTemplateInstance;
      this.setState({ templates, templateInstancesByInstanceId, currentTemplateInstanceId })
    })
  }

  onAddNewButtonClick = (
    graphInstanceLabel,
    graphInstanceIndex,
    parentTemplateInstanceId,
    templateInstanceId
  ) => {
      let templates = this.state.templates,
      templateInstancesByInstanceId = this.state.templateInstancesByInstanceId,
      currentTemplateInstanceId,
      hiddenTemplates = this.state.hiddenTemplates;
      if (!templateInstanceId) {
        hiddenTemplates.push(parentTemplateInstanceId)
        this.setState({ hiddenTemplates })
      }
      // check if template is already in cache, if so dont make new request
      fetch("http://localhost:3000/graph_models/template?label=" + graphInstanceLabel)
      .then(response => response.json())
      .then(data => {
        templates.push(data)
        // instanceIdGenerator() x0+0
        let newTemplateInstance = clone(data);
        let newTemplateInstanceId = templateInstanceId ? templateInstanceId : graphInstanceLabel;
        currentTemplateInstanceId = newTemplateInstanceId;
        newTemplateInstance.templateInstanceId = newTemplateInstanceId;
        templateInstancesByInstanceId[newTemplateInstanceId] = newTemplateInstance;
        templateInstancesByInstanceId[parentTemplateInstanceId].graph_instances[graphInstanceIndex]["templateInstanceId"] = newTemplateInstanceId;
        this.setState({ templates, templateInstancesByInstanceId, currentTemplateInstanceId })
      })
  }

  onAddNewButtonClickType = (type, graphInstanceIndex, parentTemplateInstanceId) => {
    this.setState({ graphChooser: { type, graphInstanceIndex, parentTemplateInstanceId }, currentTemplateInstanceId: null });
  }

  onGraphChooserSelect = (graphInstanceIndex, parentTemplateInstanceId, currentTemplateInstanceId) => {
    return (event) => {
      // check if template is in cache, otherwise request it
      // replace whatever the current instance is with this new instance
      if (currentTemplateInstanceId) {
        this.onAddNewButtonClick(event.target.value, graphInstanceIndex, parentTemplateInstanceId, currentTemplateInstanceId)
      } else {
        this.onAddNewButtonClick(event.target.value, graphInstanceIndex, parentTemplateInstanceId)
      }
    }
  }

  switchCurrentTemplateInstance = (hiddenTemplateInstanceId) => {
    return () => {
      let hiddenTemplates = this.state.hiddenTemplates;
      hiddenTemplates.pop();
      this.setState({ currentTemplateInstanceId: hiddenTemplateInstanceId, graphChooser: null, hiddenTemplates })
    }
  }

  handlePropertyChange = (templateInstanceId) => {
    let templateInstancesByInstanceId = this.state.templateInstancesByInstanceId;
    return (nodeInstanceIndex) => {
      return (nodePropertyIndex) => {
        return (value) => {
          templateInstancesByInstanceId[templateInstanceId].node_instances[nodeInstanceIndex].node_properties[nodePropertyIndex].value = value;
          this.setState({ templateInstancesByInstanceId })
        }
      }
    }
  }

  onGraphInstanceSelect = (graphInstanceIndex) => {
    return (evt, {suggestionValue}) => {
      this.setState((prevState) => {
        let prevTemplateInstancesByInstanceId = Object.assign(
          {}, prevState.templateInstancesByInstanceId
        );
        let template = prevTemplateInstancesByInstanceId[
          prevState.currentTemplateInstanceId
        ];
        let graphInstances = [...template.graph_instances]
        let graphInstance = graphInstances[graphInstanceIndex];
        let newGraphInstance = Object.assign({}, graphInstance);

        newGraphInstance.id = suggestionValue;
        graphInstances[graphInstanceIndex] = newGraphInstance;
        template.graph_instances = graphInstances;
        prevTemplateInstancesByInstanceId[
          prevState.currentTemplateInstanceId
        ] = template;

        return {
          templateInstancesByInstanceId: prevTemplateInstancesByInstanceId,
        };
      });
    }
  }

  create = () => {
    fetch('http://localhost:3000/graphs/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify(this.state.templateInstancesByInstanceId[this.state.currentTemplateInstanceId])
    }).then(response => response.json())
    .then(data => {
      this.setState({ graph: data })
      // if (this.state.parentTemplateInstanceId) {
      //   let templateInstancesByInstanceId = this.state.templateInstancesByInstanceId
      //   templateInstancesByInstanceId[this.state.parentTemplateInstanceId].graph_instances[graphInstanceIndex].id = data.elastic_id
      //   this.setState({ currentTemplateInstanceId: this.state.parentTemplateInstanceId, templateInstancesByInstanceId })
      // }
    })
  }

  render() {
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
        border: "rgb(0,188,212) 2px solid",
        width: "90%",
        marginLeft: "5%"
      }
    },
    template, hiddenTemplates, graphChooser, graph;

    if (this.state.currentTemplateInstanceId && !this.state.graph) {
      template = <GraphTemplate
        template = { this.state.templateInstancesByInstanceId[this.state.currentTemplateInstanceId] }
        onAddNewButtonClickType = { this.onAddNewButtonClickType }
        onAddNewButtonClick = { this.onAddNewButtonClick }
        handlePropertyChange = { this.handlePropertyChange(this.state.currentTemplateInstanceId) }
        onClickCreate = { this.create }
        onGraphInstanceSelect = { this.onGraphInstanceSelect }/>
    }

    if (this.state.graphChooser) {
      graphChooser = <GraphChooser
        graphChooser = { this.state.graphChooser }
        currentTemplateInstanceId = { this.state.currentTemplateInstanceId }
        onGraphChooserSelect = { this.onGraphChooserSelect } />
    }

    if (this.state.hiddenTemplates.length > 0) {
      hiddenTemplates = this.state.hiddenTemplates.map((hiddenTemplateInstanceId, index) => {
        return (
          <div
            key = { index }
            style = { styles.hiddenTemplateBar }>
            <div
              style = { { display: "inline-block" } }
              onClick = { this.switchCurrentTemplateInstance(hiddenTemplateInstanceId) }> + </div>
            { this.state.templateInstancesByInstanceId[hiddenTemplateInstanceId].label }
          </div>
        )
      })
    }

    if (this.state.graph) {
      graph = <GraphDisplay graph = { this.state.graph }/>
    }

    return (
      <div style = { { textAlign: "center" } }>
        <MatUiAutosuggest
          handleSuggestionsFetchRequested={this.onChange}
          onSuggestionSelected={this.onSelect}
          suggestions={this.state.autocompleteResults}
          getSuggestionValue={(item) => item}
          renderMenuItem={(suggestion) => {
            return (
              <div>
                {suggestion}
              </div>
            );
          } }
        />
        { hiddenTemplates }
        { graphChooser }
        { template }
        { graph }
      </div>
    )
  }
}
