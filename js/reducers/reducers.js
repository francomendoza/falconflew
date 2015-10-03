import { combineReducers } from 'redux';
import { submitForm } from '../actions/actions';
import db from '../../example_template';
import { routerStateReducer } from 'redux-router';

const initialState =  [];
// const currentTemplateId = 1;
let templatesById = {};
db.forEach((el) => { templatesById[el.template_id] = el });
const initialTemplateState = { templatesById };
const templateMap = [{}]

function updateEntities(state = initialState, action){
  switch (action.type){
    case 'SUBMIT_FORM':
      // console.log('hello from line 9!');
      return [...state, action.node_obj];
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
  templates,
  router: routerStateReducer
})

export default reducers;