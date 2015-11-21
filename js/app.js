import React from 'react';
import { connect } from 'react-redux';
import EntityList from './components/entity_list';
import EntitySearch from './components/entity_search';
import TemplateList from './components/template_list';
import EntityShowPage from './components/entity_show_page';

var App = React.createClass({

  render: function() {
   return (<div>
             <TemplateList autocompleteItems = {this.props.autocompleteItems} dispatch = {this.props.dispatch} />
             <EntityList />
             <EntitySearch />
             <EntityShowPage />
             {this.props.children}
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


