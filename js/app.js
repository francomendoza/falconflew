var React = require('react');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var EntityStore = require('./stores/entity_store');
var Empty = require('./components/empty');
var EntityList = require('./components/entity_list');
var TemplateList = require('./components/template_list');
var TemplateForm = require('./components/template_form');


var App = React.createClass({
  render: function() {
   return (<div>
             <TemplateList />
             <EntityList />
             <div className="template_form"><RouteHandler /></div>
           </div>);
  }
});

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='template_form' path='/template_form/:template_id' subform={false} handler={TemplateForm} />
    <DefaultRoute handler={Empty}/>
  </Route>
)
ReactRouter.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('main'))
});
