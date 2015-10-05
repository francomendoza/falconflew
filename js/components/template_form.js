var React = require('react');
var _ = require('lodash');
var templates = require('../../example_template')
var entities = [];
var Empty = require('./empty');
var PropertyFormElement = require('./property_form_element');
var Autosuggest = require('react-autosuggest');
import { submitForm, updatePropertyValue, toggleFormVisibility } from '../actions/actions';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

var RelationshipFormElement = React.createClass({

  handleRelationshipChange: function(event) {
    var obj = {};
    obj.related_node = this.props.related_node;
    obj.related_node.entity_id = event.target.value;
    obj.index = this.props.index;
    this.props.handleChange(obj);
  },

  // newEntityForm: function() {
  //   this.setState({is_creating: true});
  //   this.props.updateParentBackground();
  // },

  getTemplateById: function(id) {
    return _.find(templates, function(template) { return template.template_id === id; }) || {node_label: ''};
  },

  // getEntitiesForTemplate: function(these_entities) {
  //   var that = this;
  //   return _.filter(these_entities, function(entity){
  //     return entity.template_id === that.props.related_node.data.template_id;
  //   });
  // },

  onEntityAdded: function(updated_entities) {
    new_entities = this.getEntitiesForTemplate(updated_entities);
    this.setState({value: _.last(new_entities).entity_id});
    this.handleRelationshipChange();
  },

  clickDammit: function() {
    this.props.toggleShow(this.props.templateInstanceId);
  },

  render: function(){
    var template_form;
    // var entities_for_template = this.getEntitiesForTemplate(entities);
    if(this.props.templateInstanceState[this.props.templateInstanceId].visible){
      template_form = <TemplateForm 
        templateInstanceId = { this.props.templateInstanceId }
        templateInstances = { this.props.templateInstances }
        templateInstanceState = { this.props.templateInstanceState }
        templatesById = { this.props.templatesById } 
        currentTemplateId = { this.props.related_node.template_id }
        dispatch = { this.props.dispatch } />
    }
    return (
      <div className="relationship_element">
        <div style={{padding: "10px"}}>
          <label>{this.props.templatesById[this.props.related_node.template_id].node_label}: </label>
          <Autosuggest suggestions={this.props.getSuggestions} />
          <button onClick={ this.clickDammit }>Create New</button>
        </div>
        {template_form}
      </div>
    );
  }
});

var TemplateForm = React.createClass({

  getTemplateName: function(template_id) {
    var component = this;
    var this_template = _.find(templates, function(template) {
      return template.template_id == component.props.params.template_id
    });
    return {
      template_name: this_template.template_name
    };
  },

  getSuggestions: function(input, callback) {
    var regex = new RegExp('^' + input, 'i');
    var suggestions = _.filter(['Test', 'Team', 'Testicles', 'Teeth', 'Touch'], function(option){ return regex.test(option); });
    setTimeout(function(){ callback(null, suggestions);}, 300);
  },

  showEntityForm: function(){
    //change subtemplates state to show
  },

  handlePropertyChange: function(modified_obj){
    this.props.dispatch(updatePropertyValue(modified_obj));
  },

  getTemplate: function(id) {
    var this_template = _.find(templates, function(template) {
      return template.template_id == id
    });
    return this_template
  },

  createNode: function() {
    // this.setState({
    //   submitted: true
    // }, function() {
    const { dispatch } = this.props;
    let node_properties = this.props.templatesById[this.props.params.currentTemplateId].node_properties.map((node_property) => {

      return 

    });

      dispatch(submitForm());
    // })
    // if (!this.props.subform) {
      // this.context.router.transitionTo('/');
    // }
  },

  updateParentBackground: function(){
    this.setState({active: false});
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

    var header, properties, related_nodes, submitButton, template;

    var background_color = "#cfd4d8"
    // if(this.state.active){
    //   background_color = "white"
    // }

    header = <h3 style={{padding: "10px", margin: "0"}}>New {this.props.templatesById[this.props.currentTemplateId].node_label}</h3>

    properties = this.props.templatesById[this.props.currentTemplateId].node_properties.map(function(property, index) {
      return <PropertyFormElement
      key = { index }
      index = { index }
      currentTemplateId = { that.props.currentTemplateId }
      property = { property } 
      handlePropertyChange = { that.handlePropertyChange } />
    });

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
      dispatch = { that.props.dispatch } />
    });

    submitButton = <div style={{padding: "10px"}}><button onClick = {this.createNode}> Submit </button></div>

    if (this.props.currentTemplateId) {
      template = <div style={{outline: "black solid 1px", backgroundColor: background_color}}> {header} {properties} {related_nodes} {submitButton} </div>
    } else {
      template = <Empty/>
    }

    return <div> {template} </div>;
  }

});

function mapStateToProps(state){
  return {
    templateInstanceState: state.templateInstances.templateInstanceState,
    templateInstanceById: state.templateInstances.templateInstanceById,
    templateInstances: state.templateInstances.templateInstances,
  }
}

export default connect(mapStateToProps)(TemplateForm);
// module.exports = TemplateForm;
