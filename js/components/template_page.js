import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import TemplateForm from './template_form';

var TemplatePage = React.createClass({

  render: function(){
    return <TemplateForm
      templatesById = { this.props.templatesById } 
      currentTemplateId = { this.props.currentTemplateId }/>
  }

});

function mapStateToProps(state){
  return {
    entities: state.entities,
    templatesById: state.templates.templatesById,
    currentTemplateId: state.router.params.currentTemplateId,
    templateMap: state.templateMap,
    router: state.router
  }
}

export default connect(mapStateToProps,{ pushState })(TemplatePage);