export function updateEntities(state = [], action){
  switch (action.type){
    case 'SUBMIT_FORM':
      return [...state, action.new_node];
    default:
      return state;
  }
}

export function displayedTokens(state = [], action) {
  switch (action.type){
    case 'DISPLAY_TOKEN':
      return [...state, action.data.entity]
    default:
      return state;
  }
}

export function entitySearchResults(state = [], action) {
  switch (action.type) {
    case 'SHOW_SHORTEST_PATH_RESULTS':
      return action.data;
    default:
      return state;
  }
}

export function entitiesByLabel(state = {}, action){
  switch (action.type){
    case 'ADD_ENTITIES_BY_LABEL':
      return Object.assign({}, state, { [action.label]: action.entities });
    default:
      return state;
  }
}

export function shownEntity(state = {}, action) {
  switch(action.type) {
    case 'SETUP_SHOW_ENTITY_STATE':
      return action.data
    default:
      return state;
  }
}

export function entitySearchAutocomplete(state = [], action) {
  switch (action.type) {
    case 'ENTITY_SEARCH_INPUT':
      return action.data
    default:
      return state
  }
}

export function childTemplatesByEntityId(state = {}, action){
  switch (action.type){
    case 'SHOW_ENTITY_CARD_CHILD_TEMPLATES':
      return Object.assign({}, state, { [action.entity_id]: action.data })
    default:
      return state;
  }
}