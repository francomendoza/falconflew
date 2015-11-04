import React from 'react';
import { connect } from 'react-redux';
import PropertyFormElement from './property_form_element';
import Empty from './empty';
import RelatedNodeElement from './related_node_element';
import { submitForm, updatePropertyValue, toggleFormVisibility, setActiveTemplate, autocompleteEntitiesByLabel, updateRelationshipEntityIdArray, incrementRelatedNodeCount } from '../actions/actions';

var TemplatePage = React.createClass({

  handlePropertyChange: function(templateInstanceId, index){
    var that = this;
    return function(value){
      that.props.dispatch(updatePropertyValue(templateInstanceId, index, value));
    }
  },

  submitHandler: function(templateInstanceId) {
    return () => {
      this.props.dispatch(submitForm(templateInstanceId));
    }
  },

  clickHandler: function(templateInstanceId){
    var that = this;
    return function(event){
      event.stopPropagation()
      that.props.dispatch(setActiveTemplate(templateInstanceId));
    }
  },

  toggleTemplateFormVisibility: function(templateInstanceId){
    this.props.dispatch(toggleFormVisibility(templateInstanceId));
  },

  handleRelationshipChange: function(templateInstanceId, relatedNodeIndex) {
    var that = this;
    return function(value, entityIdIndex) {
      that.props.dispatch(updateRelationshipEntityIdArray(templateInstanceId, relatedNodeIndex, value, entityIdIndex));
    }
  },

  incrementRelatedNode: function(templateInstanceId, index) {
    return () => {
      this.props.dispatch(incrementRelatedNodeCount(templateInstanceId, index));
    }
  },

  recursive: function(templateInstanceId, array){

    var templateInstance = this.props.templateInstancesByInstanceId[templateInstanceId];

    let header_style = {
      height: "40px",
      textAlign: "center",
      background: "linear-gradient(#002c6b 0%, #3971bd 100%)",
      color: "white"
    };

    let containerStyles = { 
      outline: "black solid 1px", 
      opacity: this.props.activeTemplate === templateInstanceId ? "1" : "0.3"
    }

    array.push(<div style = { header_style }
      key = { templateInstanceId + 'header' }><h3 style = { { padding: "10px", margin: "0" } }>New { templateInstance.node_label[0] }</h3></div>);

    this.props.templateInstancesByInstanceId[templateInstanceId].node_properties.map((node_property, index) => {
      var property_form_element = <PropertyFormElement
        key = { node_property._id['$oid'] }
        property = { node_property } 
        handlePropertyChange = { this.handlePropertyChange(templateInstanceId, index) } 
        clickHandler = { this.clickHandler(templateInstanceId) } 
        style = { containerStyles }/>

      array.push(property_form_element);
    });

    (this.props.templateInstancesByInstanceId[templateInstanceId].related_nodes || []).map((related_node, index) => {
      var related_node_element = <RelatedNodeElement
        key = { related_node._id['$oid'] }
        related_node = { related_node }
        templateInstanceId = { templateInstanceId + index }
        toggleShow = { this.toggleTemplateFormVisibility } 
        dispatch = { this.props.dispatch }
        activeTemplate = { this.props.activeTemplate } 
        entitiesByLabel = { this.props.entitiesByLabel }
        templateInstancesByInstanceId = { this.props.templateInstancesByInstanceId } 
        handleRelationshipChange = { this.handleRelationshipChange(templateInstanceId, index) } 
        incrementRelatedNode = { this.incrementRelatedNode(templateInstanceId, index) }
        relatedNodeCount = { this.props.templateInstanceStateMap[templateInstanceId].related_node_counts[index] }/>

      array.push(related_node_element);
      var nextTemplateInstanceId = this.props.templateInstanceMap[templateInstanceId][index];
      var nextTemplate = <Empty/>

      if(this.props.templateInstanceStateMap[nextTemplateInstanceId].visible){
        nextTemplate = this.recursive(nextTemplateInstanceId, array);
      }
    });

    array.push(<div style = { { padding: "10px" } }
      key = { templateInstanceId + 'submit' }><button onClick = { this.submitHandler(templateInstanceId) }> Submit </button></div>)
    
    return array;
  },

  render: function(){

    let container_styles = {
      marginLeft: '100px',
      marginRight: '100px',
      outline: "black solid 1px"
    };

    var mega_array = this.recursive('x0', []);
 
    return <div style = { container_styles } >{ mega_array }</div>
  }

});

function mapStateToProps(state){
  return {
    currentTemplateId: state.router.params.currentTemplateId,
    templateInstancesByInstanceId: state.templateInstancesByInstanceId,
    templateInstanceStateMap: state.templateInstanceStateMap,
    templateInstanceMap: state.templateInstanceMap,
    activeTemplate: state.activeTemplate,
    entitiesByLabel: state.entitiesByLabel 
  }
}

export default connect(mapStateToProps)(TemplatePage);