import React from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import ReactDOM from 'react-dom';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import routes from './routes';
import createHistory from 'history/lib/createBrowserHistory';
import TemplateForm from './components/template_form';

const store = compose(
  reduxReactRouter({routes,createHistory})
  )(createStore)(reducers);

ReactDOM.render(
  <Provider store = {store}>
    <ReduxRouter />
    </Provider>, 
    document.getElementById('main'));
