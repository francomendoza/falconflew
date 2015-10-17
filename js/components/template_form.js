var React = require('react');
var _ = require('lodash');
var Empty = require('./empty');
var PropertyFormElement = require('./property_form_element');
var Autosuggest = require('react-autosuggest');
import { submitForm, updatePropertyValue, toggleFormVisibility, setActiveTemplate } from '../actions/actions';
import { connect } from 'react-redux';

var RelationshipFormElement = React.createClass({

  handleRelationshipChange: function(event) {
    var obj = {};
    obj.related_node = this.props.related_node;
    obj.related_node.entity_id = event.target.value;
    obj.index = this.props.index;
    this.props.handleRelationshipChange(obj);
  },

  clickDammit: function() {
    this.props.toggleShow(this.props.templateInstanceId);
  },

  render: function(){
    var template_form;

    if(this.props.templateInstanceState[this.props.templateInstanceId].visible){
      template_form = <TemplateForm 
        templateInstanceId = { this.props.templateInstanceId }
        templateInstances = { this.props.templateInstances }
        templateInstanceState = { this.props.templateInstanceState }
        templatesById = { this.props.templatesById } 
        currentTemplateId = { this.props.related_node.template_id }
        dispatch = { this.props.dispatch }
        activeTemplate = { this.props.activeTemplate } 
        clickHandler = { this.props.clickHandler(this.props.templateInstanceId) }/>
    }
    return (
      <div className="relationship_element">
        <div style={{padding: "10px"}}>
          <label>{ this.props.templatesById[this.props.related_node.template_id].node_label }: </label>
          <Autosuggest suggestions={ this.props.getSuggestions } />
          <button onClick={ this.clickDammit }>Create New</button>
        </div>
        {template_form}
      </div>
    );
  }
});

var TemplateForm = React.createClass({

  getSuggestions: function(input, callback) {
    var regex = new RegExp('^' + input, 'i');
    var suggestions = _.filter(['Test', 'Team', 'Testicles', 'Teeth', 'Touch'], function(option){ return regex.test(option); });
    setTimeout(function(){ callback(null, suggestions);}, 300);
  },

  handlePropertyChange: function(modified_obj){
    this.props.dispatch(updatePropertyValue(modified_obj));
  },

  submitHandler: function(templateInstanceId) {
    this.props.dispatch(submitForm(templateInstanceId));
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

  handleRelationshipChange: function(template_id) {
    var that = this;
    return function(value) {
      that.props.dispatch(updateRelationshipEntityId(that.props.currentTemplateId, template_id, value));
    }
  },

  render: function() {
    const { dispatch, entities } = this.props;
    var that = this;

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

    header = <div style = { header_style }><h3 style = { { padding: "10px", margin: "0" } }>New { this.props.templatesById[this.props.currentTemplateId].node_label }</h3></div>

    properties = this.props.templatesById[this.props.currentTemplateId].node_properties.map(function(property, index) {
      return <PropertyFormElement
      key = { index }
      index = { index }
      templateInstanceId = { that.props.templateInstanceId }
      property = { property } 
      handlePropertyChange = { that.handlePropertyChange } 
      clickHandler = { that.clickHandler(that.props.templateInstanceId) } />
    });

    if(this.props.templatesById[this.props.currentTemplateId].related_nodes){
      related_nodes = this.props.templatesById[this.props.currentTemplateId].related_nodes.map(function(related_node, index) {
        return <RelationshipFormElement
        key = { index }
        index = { index }
        related_node = { related_node }
        templatesById = { that.props.templatesById }
        getSuggestions = { that.getSuggestions }
        templateInstanceState = { that.props.templateInstanceState }
        templateInstances = { that.props.templateInstances }
        templateInstanceId = { that.props.templateInstanceId + index }
        toggleShow = { that.toggleTemplateFormVisibility } 
        dispatch = { that.props.dispatch }
        activeTemplate = { that.props.activeTemplate } 
        clickHandler = { that.clickHandler }/>
      });
    }
    submitButton = <div style={{padding: "10px"}}><button onClick = { this.submitHandler }> Submit </button></div>

    let containerStyles = { 
      outline: "black solid 1px", 
      opacity: this.props.activeTemplate === this.props.templateInstanceId ? "1" : "0.3"
    }

    if (this.props.currentTemplateId) {
      template = <div style={ containerStyles }> { header } { properties } { related_nodes } { submitButton } </div>
    } else {
      template = <Empty/>
    }

    return <div> { template } </div>;
  }

});

function mapStateToProps(state){
  return {
    templateInstanceState: state.templateInstanceStateMap,
    templateInstances: state.templateInstanceMap,
    activeTemplate: state.activeTemplate
  }
}

export default connect(mapStateToProps)(TemplateForm);
// module.exports = TemplateForm;
