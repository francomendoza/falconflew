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
    // case 'PARSE_TEMPLATES':
    //   return Object.assign({}, state, generateTemplateInstanceMap(action.templatesByNodeLabel, action.currentTemplateNodeLabel, 'x0', {}));
    case 'ADD_TEMPLATE_INSTANCE_MAP':
      let newTemplateMap = {
        [action.templateInstanceId]: [],
      };

      if (action.parentTemplateInstanceId) {
        let newParentMap = [
          ...state[action.parentTemplateInstanceId],
          action.templateInstanceId
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
    // case 'PARSE_TEMPLATES':
    //   return Object.assign({}, state, generateTemplateInstanceState(action.templatesByNodeLabel, action.currentTemplateNodeLabel, 'x0', { 'x0': { visible: true, submitted: false//,
    //     // related_node_counts: (action.templatesByNodeLabel[action.currentTemplateNodeLabel].related_nodes || []).map((el) => { return 1; })
    //   } }))
    case 'MAP_TEMPLATE_INSTANCES_STATE':
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
    case 'SUBMIT_FORM':
    case 'TOGGLE_FORM_VISIBILITY':
      return Object.assign({}, state, { visible: !state.visible });
    // case 'INCREMENT_RELATED_NODE_COUNT':
    //   let related_node_counts = state.related_node_counts
    //   return Object.assign({}, state, { related_node_counts: [...related_node_counts.slice(0, action.index), related_node_counts[action.index] + 1, ...related_node_counts.slice(action.index + 1)] })
    default:
      return state;
  }
}

function parseBoundValue(binding_string) {
  //parent.related_nodes[0].related_nodes[0].entity_id => obj['x00'].related_nodes[0].entity_id
  let segments = binding_string.split('.')
  let ref_string = 'x0'
  segments.slice(0, -1).forEach((segment) =>{
    if(segment.includes('related_nodes')){
      ref_string += segment.match(/\d+/)[0]
    } else {
      console.log('i pooped my pants');
    }
  });

  return `['${ref_string}'].${segments.slice(-1)}`
}

function generateTemplateInstancesByInstanceId(
  templatesByNodeLabel,
  currentTemplateNodeLabel,
  instanceId,
  obj,
  instructions = []
) {
  // let parent = obj['x0']
      // parent.related_nodes[0].related_nodes[0].entity_id => obj['x00'].related_nodes[0].entity_id
    //obj['x00'].related_nodes[0]['observers'] = [{'x201', related_node[0].entity_id}]
    //much mutate, so wow
  obj[instanceId] = clone(templatesByNodeLabel[currentTemplateNodeLabel]);

  instructions.forEach((instruction) => {
    //TODO: THIS ONLY WORKS FOR BINDING TO THINGS THAT ALREADY EXIST IN OBJ
    if(instruction.binding){
      let bind_source = parseBoundValue(instruction.bind_to);
      // attribute is either .node_properties[observable_index] or .related_nodes[observable_index]
      let bind_source_attribute = eval(`obj${bind_source}`)
      if(bind_source_attribute['observers']){
        bind_source_attribute['observers'].push({
          instance_id: instanceId,
          key: instruction.key,
          index: instruction.index
        })
      } else {
        bind_source_attribute['observers'] = [{
          instance_id: instanceId,
          type: instruction.type,
          key: instruction.key,
          index: instruction.index
        }]
      }
    }
    if(instruction.type == 'node_property'){
        let current_node_property = obj[instanceId].node_properties[instruction.index]
        obj[instanceId].node_properties[instruction.index] = Object.assign(
          {},
          current_node_property,
          instruction.replace_with
        )
    } else if (instruction.type == 'related_node'){
        let current_related_node = obj[instanceId].related_nodes[instruction.index] || {}
        obj[instanceId].related_nodes[instruction.index] = Object.assign(
          {},
          current_related_node,
          instruction.replace_with
        )
    }
  });

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
