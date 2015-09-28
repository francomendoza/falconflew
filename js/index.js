import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app';
import reducers from './reducers/reducers';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ReactDOM from 'react-dom';
var TemplateForm = require('./components/template_form');

let store = createStore(reducers);

class ReduxApp extends React.Component{
  render(){
    console.log('this should be all props:');
    console.log(this.props);
    return <Provider store = {store}>
    <App {...this.props} />
    </Provider>
  }
}

var route = (
  <Router>
    <Route path="/" component={ReduxApp}>
      <Route path="template_form/:currentTemplateId" component={TemplateForm}/>
    </Route>
  </Router>
)

ReactDOM.render(route, document.getElementById('main'))