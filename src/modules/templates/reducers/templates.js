import clone from 'clone';

export function templateInstancesByInstanceId(state = {}, action){
  switch (action.type){
    case 'ADD_TEMPLATE':
      return Object.assign(
        {},
        state,
        {
          [action.templateInstanceId]: action.template,
        },
      );
    case 'UPDATE_PROPERTY_VALUE':
    case 'UPDATE_RELATIONSHIP_VALUE':
      return Object.assign({}, state, { [action.templateInstanceId]: templateInstance(state[action.templateInstanceId], action) });
    case 'CLEAR_TEMPLATES':
      return {}
    default:
      return state;
  }
}

function templateInstance(state = {}, action){
  switch (action.type){
    case 'UPDATE_PROPERTY_VALUE':
      return Object.assign({}, state, { ["node_properties"]: node_properties(state.node_properties, action) });
    case 'UPDATE_RELATIONSHIP_VALUE':
      return Object.assign({}, state, { ["related_nodes"]: related_nodes(state.related_nodes, action) });
    default:
      return state;
  }
}

function related_nodes(state = [], action){
  switch (action.type){
    case 'UPDATE_RELATIONSHIP_VALUE':
      return [...state.slice(0, action.relatedNodeIndex), related_node(state[action.relatedNodeIndex], action), ...state.slice(action.relatedNodeIndex + 1)];
    default:
      return state;
  }
}

function related_node(state = {}, action){
  switch (action.type){
    case 'UPDATE_RELATIONSHIP_VALUE':
      return Object.assign({}, state, { entity_id: entityIds(state.entity_id, action) });
    default:
      return state;
  }
}

function entityIds(state = [], action){
  switch (action.type){
    case 'UPDATE_RELATIONSHIP_VALUE':
    //need the || statement for initial load where entity_id is null
      return [...(state || []).slice(0, action.entityIdIndex), action.value, ...(state || []).slice(action.entityIdIndex + 1)];
    default:
      return state;
  }
}

function node_properties(state = [], action){
  switch (action.type){
    case 'UPDATE_PROPERTY_VALUE':
      return [...state.slice(0, action.index), Object.assign({}, state[action.index], { value: action.value }), ...state.slice(action.index + 1)];
    default:
      return state;
  }
}

export function templateInstanceMap(state = {}, action){
  switch (action.type){
    case 'ADD_TEMPLATE':
      let newTemplateMap = {
        [action.templateInstanceId]: [],
      };

      if (action.parentTemplateInstanceId) {
        let newParentMap = [
          ...state[action.parentTemplateInstanceId].slice(0, action.indexOnParent),
          action.templateInstanceId,
          ...state[action.parentTemplateInstanceId].slice(0, action.indexOnParent + 1)
        ];
        newTemplateMap = Object.assign(newTemplateMap, {
          [action.parentTemplateInstanceId]: newParentMap,
        });
      }

      return Object.assign(
        {},
        state,
        newTemplateMap,
      );
    case 'CLEAR_TEMPLATES':
      return {}
    default:
      return state;
  }
}

export function templateInstanceStateMap(state = {}, action){
  switch (action.type){
    case 'ADD_TEMPLATE':
      return Object.assign(
        {},
        state,
        {
          [action.templateInstanceId]: action.templateInstanceStateMap,
        }
      );
    case 'SET_EDITING_USERS':
    case 'SUBMIT_FORM':
    case 'TOGGLE_FORM_VISIBILITY':
    case 'INCREMENT_RELATED_NODE_COUNT':
      return Object.assign(
        {},
        state,
        {
          [action.templateInstanceId]: templateInstanceState(
            state[action.templateInstanceId], action
          )
        }
      );
    case 'CLEAR_TEMPLATES':
      return {}
    default:
      return state;
  }
}

function templateInstanceState(state = {}, action){
  switch (action.type){
    case 'SET_EDITING_USERS':
      return Object.assign(
        {},
        state,
        {
          editingUserIds: action.editingUserIds,
        }
      );
    case 'SUBMIT_FORM':
    case 'TOGGLE_FORM_VISIBILITY':
      return Object.assign({}, state, { visible: !state.visible });
    default:
      return state;
  }
}

export function templatesByNodeLabel(state = {}, action) {
  switch (action.type){
    case 'ADD_TEMPLATES_BY_NODE_LABEL':
      return Object.assign({}, state, action.templatesByNodeLabel);
    default:
      return state;
   }
}

export function activeTemplate(state = '', action){
  switch (action.type){
    case 'SET_ACTIVE_TEMPLATE':
      return action.templateInstanceId;
    default:
      return state;
  }
}

export function autocompleteItems(state = [], action){
  switch (action.type){
    case 'ADD_ITEMS_TO_AUTOCOMPLETE':
      return [...action.items]
    default:
      return state;
  }
}
