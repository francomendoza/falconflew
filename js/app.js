import React from 'react';
import {Router, Route, IndexRoute, Link } from 'react-router';
import ReactDOM from 'react-dom'

// var EntityStore = require('./stores/entity_store');
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

var route = (
  <Router>
    <Route path="/" component={App}>
      <Route path="template_form/:template_id" component={TemplateForm}/>
    </Route>
  </Router>    
)

// var routes = (
//   <Route name='app' path='/' handler={App}>
//     <Route name='template_form' path='/template_form/:template_id' subform={false} handler={TemplateForm} />
//     <DefaultRoute handler={Empty}/>
//   </Route>
// )

// ReactRouter.run(routes, function(Handler) {
ReactDOM.render(route, document.getElementById('main'))
// });
