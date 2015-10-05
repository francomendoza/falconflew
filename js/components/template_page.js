import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import TemplateForm from './template_form';
import { updateTemplateMap, setInitialTemplateInstances } from '../actions/actions'

var TemplatePage = React.createClass({

  componentWillMount: function(props){
    this.props.dispatch(setInitialTemplateInstances(this.props.currentTemplateId));
  },

  componentWillReceiveProps: function(next_props){
    this.props.dispatch(setInitialTemplateInstances(next_props.currentTemplateId));
  },

  render: function(){
    return <TemplateForm
      templateInstanceId = { 'x0' }
      templatesById = { this.props.templatesById }
      currentTemplateId = { this.props.currentTemplateId }/>
  }

});

function mapStateToProps(state){
  return {
    entities: state.entities,
    templatesById: state.templates.templatesById,
    currentTemplateId: state.router.params.currentTemplateId
  }
}

export default connect(mapStateToProps)(TemplatePage);