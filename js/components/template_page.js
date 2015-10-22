import React from 'react';
import { connect } from 'react-redux';
import TemplateForm from './template_form';

var TemplatePage = React.createClass({

  render: function(){

    let container_styles = {
      'marginLeft': '100px',
      'marginRight': '100px'
    };

    return <div style = { container_styles } ><TemplateForm
      templateInstanceId = { 'x0' }
      templatesById = { this.props.templatesById }
      currentTemplateId = { this.props.currentTemplateId } 
      templateInstancesByInstanceId = { this.props.templateInstancesByInstanceId } 
      templateInstanceStateMap = { this.props.templateInstanceStateMap }
      templateInstanceMap = { this.props.templateInstanceMap }
      activeTemplate = { this.props.activeTemplate }
      entitiesByLabel = { this.props.entitiesByLabel } 
      dispatch = { this.props.dispatch } /></div>
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