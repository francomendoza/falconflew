import fetch from 'isomorphic-fetch';

export function entitySearch(search_term) {
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/entities/autocomplete?term=${search_term}`)
        .then(response => response.json())
        .then(data => dispatch(entitySearchInput(data)))
  }
}

export function entitySearchInput(data) {
  return { type: 'ENTITY_SEARCH_INPUT', data }
}

export function shortestPathSearch() {
  return (dispatch, getState) => {
    var ids = getState().displayedTokens.map((entity) => {return entity.entity_id})
    return fetch('http://localhost:3000/entities/shortest_path', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({ids: ids})
      })
      .then(response => response.json())
      .then(data => dispatch(showShortestPathResults(data)))
  }
}

export function showShortestPathResults(data){
  return { type: 'SHOW_SHORTEST_PATH_RESULTS', data };
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

export function addToken(entity_id, label) {
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/entities/${entity_id}?node_label=${label}`)
        .then(response => response.json())
        .then(data => dispatch(displayToken(data)))
  }
}

export function displayToken(data){
  return {type: 'DISPLAY_TOKEN', data}
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
