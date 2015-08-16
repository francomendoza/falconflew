var App = React.createClass({
  render: function() {
   return (<div>
             <TemplateList />
             <EntityList />
             <RouteHandler />
           </div>);
  }
});

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='template_form' path='/template_form/:template_id' handler={TemplateForm} />
    <DefaultRoute handler={Empty}/>
  </Route>
)

ReactRouter.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('main'))
});
