import React from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './app';
import reducers from './reducers/reducers';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ReactDOM from 'react-dom';
import { reduxReactRouter } from 'redux-router';
var TemplateForm = require('./components/template_form');

let store = compose(reduxReactRouter({routes,createHistory}))(createStore)(reducers);

class ReduxApp extends React.Component{
  render(){
    console.log('this should be all props:');
    console.log(this.props);
    return <Provider store = {store}>
    <App {...this.props} />
    </Provider>
  }
}

var entering = function(){
  console.log("JK LOLZ");
}

var route = (
  <Router>
    <Route path="/" component={ReduxApp}>
      <Route path="template_form/:currentTemplateId" component={TemplateForm} onEnter={entering}/>
    </Route>
  </Router>
)

ReactDOM.render(route, document.getElementById('main'))