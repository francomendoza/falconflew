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
    case 'PARSE_TEMPLATES':
      return Object.assign(
        {},
        state,
        generateTemplateInstancesByInstanceId(
          action.templatesByNodeLabel,
          action.currentTemplateNodeLabel,
          'x0',
          {}
        )
      );
    case 'CHANGE_CHILD_RELATED_NODE_TEMPLATE':
      return Object.assign({}, state, generateTemplateInstancesByInstanceId(action.templatesByNodeLabel, action.node_label, action.templateInstanceId, {}, action.instructions));
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
    case 'CHANGE_CHILD_RELATED_NODE_TEMPLATE':
      return Object.assign({}, state, generateTemplateInstanceMap(action.templatesByNodeLabel, action.node_label, action.templateInstanceId, {}));
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
    case 'CHANGE_CHILD_RELATED_NODE_TEMPLATE':
      return Object.assign(
        {},
        state,
        generateTemplateInstanceState(
          action.templatesByNodeLabel,
          action.node_label,
          action.templateInstanceId,
          {
            [action.templateInstanceId]: {
              visible: false,
              submitted: false,
            }
          }
        )
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

function generateTemplateInstancesByInstanceId(
  templatesByNodeLabel,
  currentTemplateNodeLabel,
  instanceId,
  obj,
  instructions = []
) {
    //much mutate, so wow
  obj[instanceId] = clone(templatesByNodeLabel[currentTemplateNodeLabel]);
  //why do we check if the template exists?
  if(obj[instanceId] && obj[instanceId].related_nodes){
    obj[instanceId].related_nodes.forEach(function(related_node, index){
      let thisInstanceId = `${instanceId}${index}`;
      if(related_node.match_type !== 'child' && !related_node.children_templates){
        if(related_node.instructions){
          generateTemplateInstancesByInstanceId(
            templatesByNodeLabel,
            related_node.template_label[0],
            thisInstanceId,
            obj,
            related_node.instructions
          );
        } else {
          generateTemplateInstancesByInstanceId(
            templatesByNodeLabel,
            related_node.template_label[0],
            thisInstanceId,
            obj
          );
        }
      }else {
        obj[thisInstanceId] = null;
      }
    });
  }
  return obj;
}

function generateTemplateInstanceMap(templatesByNodeLabel, currentTemplateNodeLabel, instanceId, obj) {
  if(obj[instanceId] !== undefined || obj[instanceId] !== null) {
    obj[instanceId] = [];
  }
  if(templatesByNodeLabel[currentTemplateNodeLabel] && templatesByNodeLabel[currentTemplateNodeLabel].related_nodes){
    templatesByNodeLabel[currentTemplateNodeLabel].related_nodes.forEach(function(el, index){
      // if(el.match_type !== 'child' && !el.children_templates){
        let thisInstanceId = `${instanceId}${index}`;
        obj[instanceId].push(thisInstanceId);
        generateTemplateInstanceMap(templatesByNodeLabel, el.template_label[0], thisInstanceId, obj);
      // }else{
        // obj[instanceId].push(null);
      // }
    });
  }
  return obj;
}

function generateTemplateInstanceState(
  templatesByNodeLabel,
  currentTemplateNodeLabel,
  instanceId,
  obj
) {
  if(templatesByNodeLabel[currentTemplateNodeLabel] &&
    templatesByNodeLabel[currentTemplateNodeLabel].related_nodes){
    templatesByNodeLabel[currentTemplateNodeLabel].related_nodes.forEach((el, index) => {
      let thisInstanceId = `${instanceId}${index}`;
        obj[thisInstanceId] = {
          visible: false,
          submitted: false,
          user_ids_editing: [],
        };
        generateTemplateInstanceState(
          templatesByNodeLabel,
          el.template_label[0],
          thisInstanceId,
          obj
        );
    });
  }
  return obj;
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
