import React from 'react';
import { connect } from 'react-redux';

var Empty = require('./components/empty');
var EntityList = require('./components/entity_list');
var TemplateList = require('./components/template_list');
var TemplateForm = require('./components/template_form');

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


