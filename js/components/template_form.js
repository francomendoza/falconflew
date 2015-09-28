var React = require('react');
var _ = require('lodash');
var templates = require('../../example_template')
var entities = [];
var Empty = require('./empty');
var PropertyFormElement = require('./property_form_element');
var Autosuggest = require('react-autosuggest');
import { submitForm } from '../actions/actions';
import { connect } from 'react-redux';

var RelationshipFormElement = React.createClass({

  getInitialState: function(){
    var matching_entities = this.getEntitiesForTemplate(entities);
    var entity_id = null;
    if(matching_entities.length > 0) {
        entity_id = matching_entities[0].entity_id;
    }
    return {is_creating: false, value: entity_id}
  },

  handleChange: function(event){
    this.setState({value: event.target.value});
    this.triggerUpdateForParent();
  },

  triggerUpdateForParent: function() {
    var obj = this.props.related_node;
    obj.data.entity_id = this.state.value;
    obj.index = this.props.index;
    obj.related_node = true;
    this.props.updateParentState(obj);
  },

  newEntityForm: function() {
    this.setState({is_creating: true});
    this.props.updateParentBackground();
  },

  getTemplateById: function(id) {
    return _.find(templates, function(template) { return template.template_id === id; }) || {node_label: ''};
  },

  getEntitiesForTemplate: function(these_entities) {
    var that = this;
    return _.filter(these_entities, function(entity){
      return entity.template_id === that.props.related_node.data.template_id;
    });
  },

  onEntityAdded: function(updated_entities) {
    new_entities = this.getEntitiesForTemplate(updated_entities);
    this.setState({value: _.last(new_entities).entity_id});
    this.triggerUpdateForParent();
  },
        
  getSuggestions: function(input, callback) {
    var regex = new RegExp('^' + input, 'i');
    var suggestions = _.filter(['Test', 'Team', 'Testicles', 'Teeth', 'Touch'], function(option){ return regex.test(option); });
    setTimeout(function(){ callback(null, suggestions);}, 300);
  },

  render: function(){
    var that = this;
    var template_form;
    var entities_for_template = this.getEntitiesForTemplate(entities);
    if(this.state.is_creating){
      template_form = <TemplateForm params={{template_id: this.props.related_node.data.template_id}} subform={true}/>
    }
    return (
      <div className="relationship_element">
        <div style={{padding: "10px"}}>
          <label>{this.getTemplateById(this.props.related_node.data.template_id).node_label}: </label>
          <Autosuggest suggestions={this.getSuggestions} />
          <button onClick={this.newEntityForm}>Create New</button>
        </div>
        {template_form}
      </div>
    );
  }
});

module.exports = RelationshipFormElement;

var TemplateForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getTemplateName: function(template_id) {
    var component = this;
    var this_template = _.find(templates, function(template) {
      return template.template_id == component.props.params.template_id
    });
    return {
      template_name: this_template.template_name
    };
  },

  updateStateFromChild: function(data_obj) {

    if(data_obj.related_node){
      this.state.entity_template.related_nodes[data_obj.index] = data_obj.data
      this.setState(data_obj, function() {
        console.log(this.state.entity_template);
      });
    }else if(data_obj.node_properties){
      this.state.entity_template.node_property[data_obj.index] = data_obj.data
      this.setState(data_obj, function() {
        console.log(this.state.entity_template);
      });
    }
  },

  getInitialState: function() {
    return {
      entity_template: this.getTemplate(this.props.params.template_id),
      submitted: false,
      active: true,
      templates: []
    }
  },

  handleTemplateLoad: function(templates){
    this.setState({templates: templates});
  },

  getTemplate: function(id) {
    var this_template = _.find(templates, function(template) {
      return template.template_id == id
    });
    return this_template
  },

  componentWillReceiveProps: function(next_props) {
    this.setState({
      entity_template: this.getTemplate(next_props.params.template_id)
    }, function() {
      console.log(this.state);
    });
  },

  createNode: function() {
    this.setState({
      submitted: true
    }, function() {
      const { dispatch } = this.props;  
      dispatch(submitForm(this.state.entity_template));
    })
    if (!this.props.subform) {
      // this.context.router.transitionTo('/');
    }
  },

  updateParentBackground: function(){
    this.setState({active: false});
  },

  render: function() {
    const { dispatch, entities } = this.props;
    console.log(this.props);
    var component = this;

    var header, properties, related_nodes, submitButton, template;

    var background_color = "#cfd4d8"
    if(this.state.active){
      background_color = "white"
    }

    header = <h3 style={{padding: "10px", margin: "0"}}>New {this.state.entity_template.node_label}</h3>
    properties = this.state.entity_template.node_properties.map(function(property, index) {
      return <PropertyFormElement
      key = {index}
      index = {index}
      property = {{data: property}}
      updateParentState = {component.updateStateFromChild}/>
    })
    related_nodes = this.state.entity_template.related_nodes.map(function(related_node, index) {
      return <RelationshipFormElement
      key = {index}
      index = {index}

      updateParentState = {component.updateStateFromChild}
      related_node = {{data: related_node}}
      updateParentBackground = {component.updateParentBackground}/>
    })
    submitButton = <div style={{padding: "10px"}}><button onClick = {this.createNode}> Submit </button></div>

    if (!this.state.submitted) {
      template = <div style={{outline: "black solid 1px", backgroundColor: background_color}}> {header} {properties} {related_nodes} {submitButton} </div>
    } else {
      template = <Empty/>
    }

    return <div> {template} </div>;
  }

});

function mapStateToProps(state){
  return {
    entities: state.entities
  }
}

export default connect(mapStateToProps)(TemplateForm);
// module.exports = TemplateForm;
