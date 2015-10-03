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

  // getInitialState: function(){
  //   var matching_entities = this.getEntitiesForTemplate(entities);
  //   var entity_id = null;
  //   if(matching_entities.length > 0) {
  //       entity_id = matching_entities[0].entity_id;
  //   }
  //   return {is_creating: false, value: entity_id}
  // },

  // handleChange: function(event){
  //   this.setState({value: event.target.value});
  //   this.triggerUpdateForParent();
  // },

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

  render: function(){
    // var that = this;
    var template_form;
    // var entities_for_template = this.getEntitiesForTemplate(entities);
    if(true){ //this.prop.is_creating
      template_form = <TemplateForm 
        templatesById= { this.props.templatesById } 
        currentTemplateId = {this.props.related_node.template_id}
        subform={true}/>
    }
    return (
      <div className="relationship_element">
        <div style={{padding: "10px"}}>
          <label>{this.props.templatesById[this.props.related_node.template_id].node_label}: </label>
          <Autosuggest suggestions={this.props.getSuggestions} />
          <button onClick={this.props.toggleShow(this.props.related_node.template_id)}>Create New</button>
        </div>
        {template_form}
      </div>
    );
  }
});

// module.exports = RelationshipFormElement;

var TemplateForm = React.createClass({
  // contextTypes: {
  //   router: React.PropTypes.func
  // },

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
  // updateStateFromChild: function(data_obj) {
  //   let {dispatch} = this.props;
  //   if(data_obj.related_node){
  //     dispatch(currentlyEditingTemplateRelatedNodeUpdated(data_obj.data))
  //     this.state.entity_template.related_nodes[data_obj.index] = data_obj.data
  //     this.setState(data_obj, function() {
  //       console.log(this.state.entity_template);
  //     });
  //   }else if(data_obj.node_properties){
  //     dispatch(currentlyEditingTemplatePropertyUpdated(data_obj.data))
  //     this.state.entity_template.node_property[data_obj.index] = data_obj.data
  //     this.setState(data_obj, function() {
  //       console.log(this.state.entity_template);
  //     });
  //   }
  // },

  handlePropertyChange: function(modified_obj){
    this.props.dispatch(updatePropertyValue(modified_obj));
  },

  // getInitialState: function() {
  //   return {
  //     entity_template: this.getTemplate(this.props.params.template_id),
  //     submitted: false,
  //     active: true,
  //     templates: []
  //   }
  // },

  // handleTemplateLoad: function(templates){
  //   this.setState({templates: templates});
  // },

  getTemplate: function(id) {
    var this_template = _.find(templates, function(template) {
      return template.template_id == id
    });
    return this_template
  },

  componentWillReceiveProps: function(next_props) {
    // could update global state with an action to set current template? 

    // this.setState({
    //   entity_template: this.getTemplate(next_props.params.template_id)
    // }, function() {
    //   console.log(this.state);
    // });
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

  toggleTemplateFormVisibility: function(template_id){
    var that = this;
    return function() {
      // that.props.dispatch(toggleFormVisibility(that.props.currentTemplateId, template_id));
    }
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
      handleChange = { that.handlePropertyChange } />
    });

    related_nodes = this.props.templatesById[this.props.currentTemplateId].related_nodes.map(function(related_node, index) {
      return <RelationshipFormElement
      key = { index }
      index = { index }
      related_node = { related_node }
      updateParentBackground = { that.updateParentBackground }
      templatesById = { that.props.templatesById }
      getSuggestions = { that.getSuggestions }
      templateMap = { that.props.templateMap }
      toggleShow = { that.toggleTemplateFormVisibility(related_node.template_id) } />
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

// function mapStateToProps(state){
//   return {
//     entities: state.entities,
//     templatesById: state.templates.templatesById,
//     currentTemplateId: state.router.params.currentTemplateId,
//     templateMap: state.templateMap,
//     router: state.router
//   }
// }

// export default connect(mapStateToProps,{ pushState })(TemplateForm);
module.exports = TemplateForm;
