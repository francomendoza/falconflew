import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk';
import routes from './routes';
import reducers from './modules/reducers';

window.loggedSubmissions = {};

const reduxRouterMiddleware = syncHistory(hashHistory);

const store = compose(
  applyMiddleware(thunk, reduxRouterMiddleware),
  )(createStore)(reducers);

ReactDOM.render(
  <Provider store = { store }>
    <Router history = { hashHistory }>
      { routes(store) }
    </Router>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
