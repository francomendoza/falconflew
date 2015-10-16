import { combineReducers } from 'redux';
import * as actions from '../actions/actions';
import db from '../../example_template';
import { routerStateReducer } from 'redux-router';

const initialState =  [];
let templatesById = {};
db.forEach((el) => { templatesById[el.template_id] = el });
const initialTemplateState = { templatesById };

function updateEntities(state = initialState, action){
  switch (action.type){
    case 'SUBMIT_FORM':
      return [...state, action.node_obj];
    default:
      return state;
  }
}

function templateInstances(state = {templateInstances: {}, templateInstanceById: {}, templateInstanceState: {}}, action){
  switch (action.type){
    case 'SET_INITIAL_TEMPLATE_INSTANCES':
      return {
        templateInstances: generateInstanceMap(templatesById[action.templateId], 'x0', {}),
        templateInstanceById: generateTemplateInstances(templatesById[action.templateId], 'x0', {}),
        templateInstanceState: generateTemplateInstanceState(templatesById[action.templateId], 'x0', { 'x0': { visible: true, submitted: false } })
      }
      // find template using action.templateID and templates by ID
      // give template new instance ID, then MAP related nodes, and give each an instance ID
    case 'TOGGLE_FORM_VISIBILITY':
      return Object.assign({}, state, { templateInstanceState: templateInstanceStateMap(state.templateInstanceState, action) });
    case 'UPDATE_PROPERTY_VALUE':
      return Object.assign({}, state, { templateInstanceById: templateInstanceById(state.templateInstanceById, action) });
    default:
      return state;
  }
}

function templateInstanceById(state = {}, action){
  switch(action.type){
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

function templateInstanceStateMap(state = {}, action){
  switch (action.type){
    case 'SET_INITIAL_TEMPLATE_INSTANCES':
      return state;
    case 'TOGGLE_FORM_VISIBILITY':
      return Object.assign({}, state, { [action.templateInstanceId]: templateInstanceState(state[action.templateInstanceId], action) });
    default:
      return state;
  }
}

function templateInstanceState(state = {}, action){
  switch (action.type){
    case 'SET_INITIAL_TEMPLATE_INSTANCES':
      return state;
    case 'TOGGLE_FORM_VISIBILITY':
      return Object.assign({}, state, { visible: !state.visible });
    default:
      return state;
  }
}

function generateTemplateInstances(template, id, obj) {
  obj[id] = template;
  template.related_nodes.forEach(function(el, index){
    let thisInstanceId = `${id}${index}`;
    let thisTemplate = templatesById[el.template_id];
    obj[thisInstanceId] = thisTemplate;
    generateTemplateInstances(thisTemplate, thisInstanceId, obj);
  });
  return obj;
}

function generateInstanceMap(template, id, obj) {
  if(obj[id] !== undefined || obj[id] !== null) {
    obj[id] = [];
  }
  template.related_nodes.forEach(function(el, index){
    let thisInstanceId = `${id}${index}`;
    obj[id].push(thisInstanceId);
    generateInstanceMap(templatesById[el.template_id], thisInstanceId, obj);
  });
  return obj;
}

function generateTemplateInstanceState(template, id, obj) {
  template.related_nodes.forEach(function(el, index){
    let thisInstanceId = `${id}${index}`;
    obj[thisInstanceId] = {visible: false, submitted: false};
    generateTemplateInstanceState(templatesById[el.template_id], thisInstanceId, obj);
  });
  return obj;
}


function templates(state = initialTemplateState, action) {
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

const reducers = combineReducers({
  updateEntities,
  templates,
  router: routerStateReducer,
  templateInstances,
  activeTemplate
})

export default reducers;