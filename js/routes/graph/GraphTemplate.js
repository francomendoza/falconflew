import React from 'react';
import PropertyFormElement from '../templates/components/property_form_element';
import NodeInstance from './NodeInstance';
import GraphInstance from './GraphInstance';
import { RaisedButton } from 'material-ui';

export default React.createClass({

  render: function () {

    let styles = {
      container: {
        textAlign: "center"
      }
    }

    return (
      <div style = { styles.container }>
        <div>New { this.props.template.label }</div>
        {
          (this.props.template.node_instances || []).map((node_instance, index) => {
            return <NodeInstance
              key = { index }
              instance = { node_instance }
              handlePropertyChange = { this.props.handlePropertyChange(index) }/>
          })
        }
        {
          (this.props.template.graph_instances || []).map((graph_instance, index) => {
            return <GraphInstance
              key = { index }
              instance = { graph_instance }
              graphInstanceIndex = { index }
              parentTemplateInstanceId = { this.props.template.templateInstanceId }
              onAddNewButtonClickType = { this.props.onAddNewButtonClickType }
              onAddNewButtonClick = { this.props.onAddNewButtonClick } />
          })
        }
        <RaisedButton
          onClick = { this.props.onClickCreate }>Create New { this.props.template.label }</RaisedButton>
      </div>
    )
  }
})
