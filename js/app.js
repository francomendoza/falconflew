import React from 'react';
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

module.exports = App;


