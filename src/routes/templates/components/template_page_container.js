import React from 'react';
import EntityList from '../../entities/components/entity_list';
import TemplateList from './template_list';
import TemplatePage from './template_page';
import { connect } from 'react-redux';

var TemplatePageContainer = React.createClass({

  render: function() {
    return <div>
      <TemplateList autocompleteItems = { this.props.autocompleteItems } dispatch = { this.props.dispatch } />
      <EntityList />
      <TemplatePage />
    </div>
  }
});

function mapStateToProps(state){
  return {
    autocompleteItems: state.autocompleteItems
  }
}

export default connect(mapStateToProps)(TemplatePageContainer);
