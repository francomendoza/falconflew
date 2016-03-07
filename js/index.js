import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import thunk from 'redux-thunk';
import routes from './routes';
import reducers from './modules/reducers';

window.loggedSubmissions = {};

const reduxRouterMiddleware = syncHistory(hashHistory)

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const store = compose(
  applyMiddleware(thunk, reduxRouterMiddleware),
  )(createStore)(reducers);

ReactDOM.render(
  <Provider store = { store }>
    <Router history = { hashHistory }>
      { routes(store) }
    </Router>
  </Provider>,
  document.getElementById('main'));
