import React from 'react';
import { Route } from 'react-router';
import App from './App';
import TemplatePage from './routes/templates/components/template_page';
import EntityPage from './routes/entities/components/entity_page';
import GridPage from './routes/entities/components/grid_page';
import GraphPage from './routes/graph/GraphPage';
import TemplateContainer from './routes/templates/containers/TemplateContainer';
import NotebookPage from './routes/notebook/NotebookPage';

let enter = function(){
}

export default (store) => {
  return (
    <Route path = '/' component = { App }>
      <Route path = 'template_form/:currentTemplateId' component = { TemplatePage } />
      <Route path = 'template' component = { TemplateContainer } />
      <Route path = 'entities' component = { EntityPage } />
      <Route path = 'grid' component = { GridPage } onEnter = { enter(store) }/>
      <Route path = 'graph' component = { GraphPage } />
      <Route path = 'notebook' component = { NotebookPage } />
    </Route>
  );
};
