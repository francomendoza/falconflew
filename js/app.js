import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import EntityList from './components/entity_list';
import TemplateList from './components/template_list';

var App = React.createClass({
  render: function() {
   return (<div>
             <TemplateList />
             <EntityList />
             {this.props.children}
           </div>);
  }
});

function mapStateToProps(state){
  return {
    entities: state.entities,
    templatesById: state.templates.templatesById,
    currentTemplateId: state.templates.currentTemplateId,
    templateMap: state.templateMap,
    router: state.router
  }
}

export default connect(mapStateToProps,{ pushState })(App);

// module.exports = App;


