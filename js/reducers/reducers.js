import { combineReducers } from 'redux';
import * as actions from '../actions/actions';
import { routerStateReducer } from 'redux-router';

function updateEntities(state = [], action){
  switch (action.type){
    case 'SUBMIT_FORM':
      return [...state, action.new_node];
    default:
      return state;
  }
}

function templateInstancesByInstanceId(state = {}, action){
  switch(action.type){
    case 'ADD_TEMPLATES_BY_ID':
      return Object.assign({}, state, generateTemplateInstancesByInstanceId(action.templatesById, action.currentTemplateId, 'x0', {}));
    case 'UPDATE_PROPERTY_VALUE':
      return Object.assign({}, state, { [action.property_section.templateInstanceId]: templateInstance(state[action.property_section.templateInstanceId], action) });
    default:
      return state;
  }
}

function templateInstance(state = {}, action){
  switch(action.type){
    case 'UPDATE_PROPERTY_VALUE':
      return Object.assign({}, state, { ["node_properties"]: node_properties(state.node_properties, action) });
    default:
      return state;
  }
}

function node_properties(state = [], action){
  switch(action.type){
    case 'UPDATE_PROPERTY_VALUE':
      return [...state.slice(0, action.property_section.index), Object.assign({}, state[action.property_section.index], { value: action.property_section.value }), ...state.slice(action.property_section.index + 1)]
    default:
      return state;
  }
}

function templateInstanceMap(state = {}, action){
  switch (action.type){
    case 'ADD_TEMPLATES_BY_ID':
      return Object.assign({}, state, generateTemplateInstanceMap(action.templatesById, action.currentTemplateId, 'x0', {}));   
    default:
      return state;
  }
}

function templateInstanceStateMap(state = {}, action){
  switch (action.type){
    case 'ADD_TEMPLATES_BY_ID':
      return Object.assign({}, state, generateTemplateInstanceState(action.templatesById, action.currentTemplateId, 'x0', { 'x0': { visible: true, submitted: false } }))
    case 'SUBMIT_FORM':
    case 'TOGGLE_FORM_VISIBILITY':
      return Object.assign({}, state, { [action.templateInstanceId]: templateInstanceState(state[action.templateInstanceId], action) });
    default:
      return state;
  }
}

function templateInstanceState(state = {}, action){
  switch (action.type){
    case 'SUBMIT_FORM':
    case 'TOGGLE_FORM_VISIBILITY':
      return Object.assign({}, state, { visible: !state.visible });
    default:
      return state;
  }
}

function generateTemplateInstancesByInstanceId(templatesById, currentTemplateId, instanceId, obj) {
  obj[instanceId] = templatesById[currentTemplateId];
  if(templatesById[currentTemplateId].related_nodes){
    templatesById[currentTemplateId].related_nodes.forEach(function(el, index){
      let thisInstanceId = `${instanceId}${index}`;
      // let thisTemplate = templatesById[el.template_id];
      // obj[thisInstanceId] = thisTemplate;
      generateTemplateInstancesByInstanceId(templatesById, el.template_id, thisInstanceId, obj);
    });
  }
  return obj;
}

function generateTemplateInstanceMap(templatesById, currentTemplateId, instanceId, obj) {
  if(obj[instanceId] !== undefined || obj[instanceId] !== null) {
    obj[instanceId] = [];
  }
  if(templatesById[currentTemplateId].related_nodes){
    templatesById[currentTemplateId].related_nodes.forEach(function(el, index){
      let thisInstanceId = `${instanceId}${index}`;
      obj[instanceId].push(thisInstanceId);
      generateTemplateInstanceMap(templatesById, el.template_id, thisInstanceId, obj);
    });
  }
  return obj;
}

function generateTemplateInstanceState(templatesById, currentTemplateId, instanceId, obj) {
  if(templatesById[currentTemplateId].related_nodes){
    templatesById[currentTemplateId].related_nodes.forEach(function(el, index){
      let thisInstanceId = `${instanceId}${index}`;
      obj[thisInstanceId] = {visible: false, submitted: false};
      generateTemplateInstanceState(templatesById, el.template_id, thisInstanceId, obj);
    });
  }
  return obj;
}

function templatesById(state = {}, action) {
  switch (action.type){
    case 'ADD_TEMPLATES_BY_ID':
      return Object.assign({}, state, action.templatesById);
    default:
      return state;
   }
}

function activeTemplate(state = 'x0', action){
  switch (action.type){
    case 'SET_ACTIVE_TEMPLATE':
      return action.templateInstanceId;
    default:
      return state;
  }
}

function autocompleteItems(state = [], action){
  switch (action.type){
    case 'ADD_ITEMS_TO_AUTOCOMPLETE':
      return [...action.items]
    default:
      return state;
  }
}

const reducers = combineReducers({
  updateEntities,
  templatesById,
  router: routerStateReducer,
  templateInstancesByInstanceId,
  templateInstanceStateMap,
  templateInstanceMap,
  activeTemplate,
  autocompleteItems
})

export default reducers;