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
      // console.log('hello from line 9!');
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
        templateInstanceState: generateTemplateInstanceState(templatesById[action.templateId], 'x0', {'x0': {visible:true, submitted: false}})
      }
      // find template using action.templateID and templates by ID
      // give template new instance ID, then MAP related nodes, and give each an instance ID
    case 'TOGGLE_FORM_VISIBILITY':
      return Object.assign({}, state, {templateInstanceState: updateTemplateInstanceState(state.templateInstanceState, action.templateInstanceId)})
    default:
      return state;
  }
}

function updateTemplateInstanceState(templateInstanceState, templateInstanceId) {
  let updatingInstance = templateInstanceState[templateInstanceId] //{visible: false, submitted: true}
  let previousVisibility = updatingInstance.visible // false
  // {'x0': {visible: true, submitted:false}, 'x00': {visible:false}}
  return Object.assign({}, templateInstanceState, {[templateInstanceId]: Object.assign({}, updatingInstance, {visible: !previousVisibility})});
}

function generateTemplateInstances(template, id, obj) {
  obj[id] = template
  template.related_nodes.forEach(function(el, index){
    let thisInstanceId = `${id}${index}`;
    let thisTemplate = templatesById[el.template_id]
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

function templateMap(state = {}, action){
  switch (action.type){
    case 'ADD_TEMPLATE_TO_MAP':
      var new_id = 'x' + action.currentTemplateId + Object.keys(state).length;
      var visible = Object.keys(state).length === 0;
      return Object.assign({}, state, {[new_id]: {visible: visible, submitted: false}})
    default:
      return state;
  }
}

function updateCurrentTemplate(){

}

function templates(state = initialTemplateState, action) {
  switch (action.type){
    case "UPDATE_PROPERTY_VALUE":
      console.log('boom');
      var templatesById = initialTemplateState.templatesById;
      var currentTemplate = templatesById[action.property_section.currentTemplateId];

    default:
     return state;
   }
}

const reducers = combineReducers({
  updateEntities,
  templateMap,
  templates,
  router: routerStateReducer,
  templateInstances
})

export default reducers;