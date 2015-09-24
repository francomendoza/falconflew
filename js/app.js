import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import nodeApp from './reducers/reducers';
import { Provider } from 'react-redux';

// var EntityStore = require('./stores/entity_store');
var Empty = require('./components/empty');
var EntityList = require('./components/entity_list');
var TemplateList = require('./components/template_list');
var TemplateForm = require('./components/template_form');

let store = createStore(nodeApp);

var App = React.createClass({
  render: function() {
   return (<div>
             <TemplateList />
             <EntityList />
             {this.props.children}
           </div>);
  }
});

class ReduxApp extends React.Component{
  render(){
    return <Provider store = {store}>
    <App {...this.props} />
    </Provider>
  }
}

var route = (
  <Router>
    <Route path="/" component={ReduxApp}>
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
