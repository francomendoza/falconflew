var React = require('react');
var Empty = require('./empty');
var PropertyFormElement = require('./property_form_element');
import Autocomplete from 'react-autocomplete';
import { submitForm, updatePropertyValue, toggleFormVisibility, setActiveTemplate, autocompleteEntitiesByLabel, updateRelationshipEntityId } from '../actions/actions';

var RelationshipFormElement = React.createClass({

  clickDammit: function() {
    this.props.toggleShow(this.props.templateInstanceId);
  },

  onChange: function(event, value){
    this.props.dispatch(autocompleteEntitiesByLabel(this.props.templateInstancesByInstanceId[this.props.templateInstanceId].node_label, value));
  },

  onSelect: function(value, item){
    this.props.handleRelationshipChange(value);
  },

  render: function(){
    var template_form;
    let templateInstance = this.props.templateInstancesByInstanceId[this.props.templateInstanceId];
    var styles = {
      highlightedItem: {
        backgroundColor: "gray"
      },
      item: {
        backgroundColor: "white"
      }
    }

    if(this.props.templateInstanceStateMap[this.props.templateInstanceId].visible){
      template_form = <TemplateForm 
        templateInstanceId = { this.props.templateInstanceId }
        templateInstanceMap = { this.props.templateInstanceMap }
        templateInstanceStateMap = { this.props.templateInstanceStateMap }
        currentTemplateId = { this.props.related_node.template_id }
        dispatch = { this.props.dispatch }
        activeTemplate = { this.props.activeTemplate } 
        clickHandler = { this.props.clickHandler(this.props.templateInstanceId) }
        templateInstancesByInstanceId = { this.props.templateInstancesByInstanceId } />
    }
    return (
      <div className="relationship_element">
        <div style = { { padding: "10px" } }>
          <label>{ templateInstance.node_label }: </label>
          <Autocomplete 
          onChange = { this.onChange } 
          onSelect = { this.onSelect }
          getItemValue = { (item) => item.entity_id }
          items = { this.props.entitiesByLabel ? (this.props.entitiesByLabel[templateInstance.node_label] || []) : []  }
          renderItem={ (item, isHighlighted) => (
              <div
                style = {isHighlighted ? styles.highlightedItem : styles.item}
                key = { item.entity_id }
                id = { item.entity_id }
              >{ item.node_properties.map(function(property, index){
                return <div key = { index }>{ property.name }: { property.value }</div>
              }) }
              </div>
            ) } />
          <button onClick={ this.clickDammit }>Create New</button>
        </div>
        { template_form }
      </div>
    );
  }
});

var TemplateForm = React.createClass({

  handlePropertyChange: function(templateInstanceId, index){
    var that = this;
    return function(value){
      that.props.dispatch(updatePropertyValue(templateInstanceId, index, value));
    }
  },

  submitHandler: function(e) {
    this.props.dispatch(submitForm(this.props.templateInstanceId));
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

  handleRelationshipChange: function(templateInstanceId, index) {
    var that = this;
    return function(value) {
      that.props.dispatch(updateRelationshipEntityId(templateInstanceId, index, value));
    }
  },

  render: function() {
    const { dispatch } = this.props;
    var that = this;
    let templateInstance = this.props.templateInstancesByInstanceId[this.props.templateInstanceId];
    var header, properties, related_nodes = <Empty/>, submitButton, template;

    var background_color = "#cfd4d8";
    if(this.props.activeTemplate === this.props.templateInstanceId){
      background_color = "white"
    }

    let header_style = {
      height: "40px",
      textAlign: "center",
      background: "linear-gradient(#002c6b 0%, #3971bd 100%)",
      color: "white"
    };

    header = <div style = { header_style }><h3 style = { { padding: "10px", margin: "0" } }>New { templateInstance.node_label }</h3></div>

    properties = templateInstance.node_properties.map(function(property, index) {
      return <PropertyFormElement
      key = { index }
      templateInstanceId = { that.props.templateInstanceId }
      property = { property } 
      handlePropertyChange = { that.handlePropertyChange(that.props.templateInstanceId, index) } 
      clickHandler = { that.clickHandler(that.props.templateInstanceId) } />
    });

    if(templateInstance.related_nodes){
      related_nodes = templateInstance.related_nodes.map(function(related_node, index) {
        return <RelationshipFormElement
        key = { index }
        related_node = { related_node }
        templateInstanceStateMap = { that.props.templateInstanceStateMap }
        templateInstanceMap = { that.props.templateInstanceMap }
        templateInstanceId = { that.props.templateInstanceId + index }
        toggleShow = { that.toggleTemplateFormVisibility } 
        dispatch = { that.props.dispatch }
        activeTemplate = { that.props.activeTemplate } 
        clickHandler = { that.clickHandler }
        entitiesByLabel = { that.props.entitiesByLabel }
        templateInstancesByInstanceId = { that.props.templateInstancesByInstanceId } 
        handleRelationshipChange = { that.handleRelationshipChange(that.props.templateInstanceId, index) } />
      });
    }

    submitButton = <div style = { { padding: "10px" } }><button onClick = { this.submitHandler }> Submit </button></div>

    let containerStyles = { 
      outline: "black solid 1px", 
      opacity: this.props.activeTemplate === this.props.templateInstanceId ? "1" : "0.3"
    }

    template = <div style={ containerStyles }> { header } { properties } { related_nodes } { submitButton } </div>

    return <div> { template } </div>;
  }

});

module.exports = TemplateForm;
