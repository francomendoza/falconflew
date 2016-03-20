import React from 'react';
import PropertyFormElement from '../templates/components/property_form_element';
import NodeInstance from './NodeInstance';
import GraphInstance from './GraphInstance';

export default React.createClass({

  render: function () {

    let styles = {
      container: {
        textAlign: "center"
      }
    }
    return (
      <div style = { styles.container }>
        {
          (this.props.template.node_instances || []).map((node_instance, index) => {
            return <NodeInstance
              key = { index }
              instance = { node_instance } />
          })
        }
        {
          (this.props.template.graph_instances || []).map((graph_instance, index) => {
            return <GraphInstance
              key = { index }
              instance = { graph_instance }
              graphInstanceIndex = { index }
              parentTemplateInstanceId = { this.props.template.templateInstanceId }
              onAddNewButtonClick = { this.props.onAddNewButtonClick } />
          })
        }
        <button>Create New { this.props.template.label }</button>
      </div>
    )
  }
})
