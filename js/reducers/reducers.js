import { combineReducers } from 'redux';
import { submitForm } from '../actions/actions';

const initialState = {entities: []};

function entities(state = [], action){
  switch (action.type){
    case 'SUBMIT_FORM':
      return [...state.entities, action.node_obj];
    default:
      return state;
  }
}

const nodeApp = combineReducers({
  entities
})

export default nodeApp;