import React from 'react';
import { Route } from 'react-router';
import App from './app';
import TemplatePage from './routes/templates/components/template_page';
import EntityPage from './routes/entities/components/entity_page';

export default (
  <Route path = '/' component = { App }>
    <Route path = 'template_form/:currentTemplateId' component = { TemplatePage } />
    <Route path = 'entities' component = { EntityPage } />
  </Route>
);