import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import * as entities from './entities/reducers';
import { autocompleteItems, activeTemplate, templatesByNodeLabel, templateInstanceStateMap, templateInstanceMap, templateInstancesByInstanceId } from './templates/reducers/template';

const reducers = combineReducers({
  updateEntities: entities.updateEntities,
  entitiesByLabel: entities.entitiesByLabel,
  templatesByNodeLabel,
  router: routerStateReducer,
  templateInstancesByInstanceId,
  templateInstanceStateMap,
  templateInstanceMap,
  activeTemplate,
  autocompleteItems,
  childTemplatesByEntityId: entities.childTemplatesByEntityId,
  entitySearchAutocomplete: entities.entitySearchAutocomplete,
  shownEntity: entities.shownEntity,
  displayedTokens: entities.displayedTokens,
  entitySearchResults: entities.entitySearchResults
})

export default reducers;