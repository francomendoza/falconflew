import React from 'react';
import { connect } from 'react-redux';
import EntityList from './routes/entities/components/entity_list';
import TemplateList from './routes/templates/components/template_list';
import NavBar from './routes/entities/components/nav_bar';

var App = React.createClass({

  render: function() {
   return (<div>
    <NavBar/>
    <TemplateList autocompleteItems = { this.props.autocompleteItems } dispatch = { this.props.dispatch } />
    <EntityList />
    { this.props.children }
  </div>);
  }
});

function mapStateToProps(state){
  return {
    autocompleteItems: state.autocompleteItems
  }
}

export default connect(mapStateToProps)(App);
// module.exports = App;


