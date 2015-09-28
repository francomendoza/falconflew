import { combineReducers } from 'redux';
import { submitForm } from '../actions/actions';

const initialState =  [];

function entities(state = initialState, action){
  switch (action.type){
    case 'SUBMIT_FORM':
      console.log('hello from line 9!');
      return [...state, action.node_obj];
    default:
      return state;
  }
}

const reducers = combineReducers({
  entities
})

export default reducers;