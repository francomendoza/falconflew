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
