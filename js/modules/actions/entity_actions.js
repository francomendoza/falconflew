import fetch from 'isomorphic-fetch';
import { pushState } from 'redux-router';

export function entitySearch(search_term) {
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/entities/autocomplete?term=${search_term}`)
        .then(response => response.json())
        .then(data => dispatch(entitySearchInput(data)))
  }
}

export function entitySearchInput(data) {
  return {type: 'ENTITY_SEARCH_INPUT', data}
}

export function showEntity(entity_id, label) {
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/entities/${entity_id}?node_label=${label}`)
        .then(response => response.json())
        .then(data => dispatch(setupShowEntityState(data)))
  }
}

export function setupShowEntityState(data) {
  return {type: 'SETUP_SHOW_ENTITY_STATE', data}
}

export function selectEntityCard(entity_id){
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/entities/child_templates?entity_id='+entity_id)
      .then(response => response.json())
      .then(data => dispatch(showEntityCardChildTemplates(data, entity_id)))
  }
}

export function showEntityCardChildTemplates(data, entity_id){
  return { type: 'SHOW_ENTITY_CARD_CHILD_TEMPLATES', data, entity_id }
;}
