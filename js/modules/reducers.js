import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import * as entities from './entities/reducers';
import * as templates from './templates/reducers';

const reducers = combineReducers({
  router: routerStateReducer,

  updateEntities: entities.updateEntities,
  entitiesByLabel: entities.entitiesByLabel,
  childTemplatesByEntityId: entities.childTemplatesByEntityId,
  entitySearchAutocomplete: entities.entitySearchAutocomplete,
  shownEntity: entities.shownEntity,
  displayedTokens: entities.displayedTokens,
  entitySearchResults: entities.entitySearchResults,

  templateInstancesByInstanceId: templates.templateInstancesByInstanceId,
  templateInstanceStateMap: templates.templateInstanceStateMap,
  templateInstanceMap: templates.templateInstanceMap,
  activeTemplate: templates.activeTemplate,
  autocompleteItems: templates.autocompleteItems,
  templatesByNodeLabel: templates.templatesByNodeLabel
})

export default reducers;