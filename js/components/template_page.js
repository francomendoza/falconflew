import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import TemplateForm from './template_form';
import { updateTemplateMap, retrieveTemplates } from '../actions/actions'

var TemplatePage = React.createClass({

  // componentWillMount: function(props){
  //   // this.props.dispatch(setInitialTemplateInstances(this.props.currentTemplateId));
  //   // this.props.dispatch(retrieveTemplates("56203e035d7692cc80000008"));
  // },

  // componentWillReceiveProps: function(next_props){
  //   // this.props.dispatch(setInitialTemplateInstances(next_props.currentTemplateId));
  // },

  render: function(){

    let container_styles = {
      'marginLeft': '100px',
      'marginRight': '100px'
    };

    return <div style = { container_styles } ><TemplateForm
      templateInstanceId = { 'x0' }
      templatesById = { this.props.templatesById }
      currentTemplateId = { this.props.currentTemplateId } /></div>
  }

});

function mapStateToProps(state){
  return {
    entities: state.entities,
    templatesById: state.templatesById,
    currentTemplateId: state.router.params.currentTemplateId
  }
}

export default connect(mapStateToProps)(TemplatePage);