import React from 'react';
import { connect } from 'react-redux';
import PropertyFormElement from './property_form_element';
import Empty from '../../entities/components/empty';
import RelatedNodeElement from './related_node_element';
import {
  submitForm,
  propertyChanged,
  toggleFormVisibility,
  setActiveTemplate,
  autocompleteEntitiesByLabel,
  relationshipEntityChanged,
  incrementRelatedNodeCount
} from '../../../modules/templates/actions/template_actions';
import Button from 'material-ui/Button';

class TemplatePage extends React.Component {

  handlePropertyChange = (templateInstanceId, index) => {
    return (value) => {
      this.props.dispatch(propertyChanged(templateInstanceId, index, value));
    }
  }

  submitHandler = (templateInstanceId) => {
    return () => {
      this.props.dispatch(submitForm(templateInstanceId));
    }
  }

  clickDivHandler = (templateInstanceId) => {
    return (event) => {
      event.stopPropagation();
      if (this.props.activeTemplate !== templateInstanceId) {
        this.props.dispatch(setActiveTemplate(templateInstanceId));
      }
    }
  }

  toggleTemplateFormVisibility = (templateInstanceId) => {
    return () => {
      this.props.dispatch(toggleFormVisibility(templateInstanceId));
    }
  }

  handleRelationshipChange = (templateInstanceId, relatedNodeIndex) => {
    return (value, entityIdIndex) => {
      this.props.dispatch(relationshipEntityChanged(templateInstanceId, relatedNodeIndex, value, entityIdIndex));
    }
  }

  // incrementRelatedNode = (templateInstanceId, index) => {
  //   return () => {
  //     this.props.dispatch(incrementRelatedNodeCount(templateInstanceId, index));
  //   }
  // }

  recursive = (templateInstanceId, array) => {

    var templateInstance = this.props.templateInstancesByInstanceId[templateInstanceId];

    let header_style = {
      height: "40px",
      opacity: this.props.activeTemplate === templateInstanceId ? "1" : "0.3",
      borderBottom: "#002c6b 4px solid"
    };

    let propertyContainerStyles = {
      opacity: this.props.activeTemplate === templateInstanceId ? "1" : "0.3",
      width: (100 - 5)/(templateInstance.node_properties || []).length + "%",
      float: "left"
    }

    let relationshipContainerStyles = {
      opacity: this.props.activeTemplate === templateInstanceId ? "1" : "0.3",
      clear: "both"
    }

    let submitContainerStyles = {
      opacity: this.props.activeTemplate === templateInstanceId ? "1" : "0.3",
      padding: "10px",
      borderBottom: '4px solid rgb(0, 44, 107)',
    };

    array.push(<div style = { header_style }
      key = { templateInstanceId + 'header' }><h3 style = { { padding: "10px", margin: "0", float: "left" } }>New { templateInstance.node_label[0] }</h3></div>
    );

    templateInstance.node_properties.forEach((node_property, index) => {
      var property_form_element = <PropertyFormElement
        key = { node_property._id['$oid'] + templateInstanceId }
        property = { node_property }
        handlePropertyChange = { this.handlePropertyChange(templateInstanceId, index) }
        clickDivHandler = { this.clickDivHandler(templateInstanceId) }
        style = { propertyContainerStyles }/>

      array.push(property_form_element);
    });

    (templateInstance.related_nodes || []).forEach((related_node, index) => {
      if(related_node.visible) {
        var related_node_element = <RelatedNodeElement
          key = { (related_node._id ? related_node._id['$oid'] : index) + templateInstanceId }
          related_node = { related_node }
          templateInstanceId = { templateInstanceId + index }
          toggleShow = { this.toggleTemplateFormVisibility(templateInstanceId + index) }
          dispatch = { this.props.dispatch }
          entitiesByLabel = { this.props.entitiesByLabel }
          handleRelationshipChange = { this.handleRelationshipChange(templateInstanceId, index) }
          clickDivHandler = { this.clickDivHandler(templateInstanceId) }
          style = { relationshipContainerStyles }/>
        array.push(related_node_element);
      }
      var nextTemplateInstanceId = this.props.templateInstanceMap[templateInstanceId][index];
      var nextTemplate = <Empty/>

      if(nextTemplateInstanceId && this.props.templateInstanceStateMap[nextTemplateInstanceId].visible){
        nextTemplate = this.recursive(nextTemplateInstanceId, array);
      }
    });

    array.push(
      <div style={submitContainerStyles}
        key = { templateInstanceId + 'submit' }
      >
        <Button
          onClick = { this.submitHandler(templateInstanceId) }
          variant='raised'
        > Submit { templateInstance.node_label[0] }
        </Button>
      </div>
    )

    return array;
  }

  render() {

    let container_styles = {
      marginLeft: '100px',
      marginRight: '100px'
      // outline: "black solid 1px"
    };

    var mega_array = this.recursive('x0', []);

    return <div style = { container_styles } >{ mega_array }</div>
  }
}

function mapStateToProps(state){
  return {
    templateInstancesByInstanceId: state.templateInstancesByInstanceId,
    templateInstanceStateMap: state.templateInstanceStateMap,
    templateInstanceMap: state.templateInstanceMap,
    activeTemplate: state.activeTemplate,
    entitiesByLabel: state.entitiesByLabel
  }
}

export default connect(mapStateToProps)(TemplatePage);
