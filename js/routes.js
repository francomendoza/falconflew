import React from 'react';
import { Route } from 'react-router';
import App from './app';
import TemplateForm from './components/template_form';
import TemplatePage from './components/template_page';

export default (
  <Route path="/" component={App}>
    <Route path="template_form/:currentTemplateId" component={TemplatePage} />
  </Route>
);