import fetch from 'isomorphic-fetch';
import { routeActions } from 'react-router-redux';
import firestore from '../../../initializers/firebase';
import { findFirestoreIdByTemplateInstanceId } from './firestoreDocIdsByTemplateInstanceId';
import clone from 'clone';

export function submitForm(templateInstanceId){
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/entities/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify(getState().templateInstancesByInstanceId[templateInstanceId])
    }).then(response => response.json())
    .then(data => {
      Object.assign(window.loggedSubmissions, {[data.entity_id]: getState().templateInstancesByInstanceId[templateInstanceId]})
      dispatch(submitEntityForm(data, templateInstanceId));
      dispatch(addEntitiesByLabel([data], data.node_label[0]));
      if(templateInstanceId !== 'x0') {
        let parentTemplateId = templateInstanceId.substring(0, templateInstanceId.length - 1);
        let relatedNodeIndex = parseInt(
          templateInstanceId.substring(templateInstanceId.length - 1),
          10
        );
        let entityIdIndex = (getState().templateInstancesByInstanceId[parentTemplateId].related_nodes[relatedNodeIndex].entity_id || []).length
        dispatch(relationshipEntityChanged(parentTemplateId, relatedNodeIndex, data.entity_id, entityIdIndex));
      }
    })
    .then(() => {
      if(templateInstanceId === 'x0') {
        dispatch(routeActions.push('/'))
      }
    });
  }
}

export function submitEntityForm(new_node, templateInstanceId) {
  return { type: "SUBMIT_FORM", new_node, templateInstanceId };
}

export function autocompleteEntitiesByLabel(label, match_type, value){
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/entities/autocomplete?node_label=${label}&match_type=${match_type}&term=${value}`)
      .then(response => response.json())
      .then(data => dispatch(addEntitiesByLabel(data, label)))
  }
}

export function addEntitiesByLabel(entities, label){
  return { type: "ADD_ENTITIES_BY_LABEL", entities, label }
}

export function toggleFormVisibility(templateInstanceId){
  return { type: "TOGGLE_FORM_VISIBILITY", templateInstanceId };
}

export function updateTemplateMap(templateId){
  return { type: "ADD_TEMPLATE_TO_MAP", templateId };
}

export function editTemplateInstance(newEditingTemplateId){
  return (dispatch, getState) => {
    let currentUserId = getState().currentUserId;
    // delete current template editing from firestore
    // change editing users state occurs via subscription to firestore
    let activeTemplateId = getState().activeTemplate;
    if (activeTemplateId) {
      let templateInstanceState = getState().templateInstanceStateMap[activeTemplateId];
      let activeTemplateEditingUserIds = templateInstanceState
      .editingUserIds
      .filter((user_id) => user_id !== currentUserId);
      let activeTemplateFirebaseId = getState()
      .firebaseDocIdsByTemplateInstanceId[activeTemplateId];
      firestore.collection('EditingUserIdsByTemplateInstanceId')
      .doc(activeTemplateFirebaseId)
      .set({
        editingUserIds: activeTemplateEditingUserIds,
      }, {merge: true});
    }

    // register new template editing
    let newEditingTemplateState = getState().templateInstanceStateMap[newEditingTemplateId];
    let newTemplateEditingUserIds = [
      ...newEditingTemplateState.editingUserIds,
      currentUserId
    ];
    let newEditingTemplateFirebaseId = getState()
      .firebaseDocIdsByTemplateInstanceId[newEditingTemplateId];
    // or search for document each time?
    firestore.collection('EditingUserIdsByTemplateInstanceId')
      .doc(newEditingTemplateFirebaseId)
      .set({
        editingUserIds: newTemplateEditingUserIds,
      }, {merge: true});
    // dispatch setactive state
    dispatch(setActiveTemplate(newEditingTemplateId));
  };
}

export function setActiveTemplate(templateInstanceId) {
  return { type: "SET_ACTIVE_TEMPLATE", templateInstanceId }
}

export function clearTemplates(){
  return { type: 'CLEAR_TEMPLATES' }
}

export function fetchNewTemplate(
  currentTemplateNodeLabel,
  parentTemplateInstanceId
) {
  return async (dispatch, getState) => {
    // this should only run when its coming from search box,
    // rather than fetching a template from within another template
    dispatch(clearTemplates());
    let templateInstanceId = await dispatch(fetchAndShowTemplate(
      currentTemplateNodeLabel,
      parentTemplateInstanceId
    ));
    dispatch(routeActions.push(`/template_form/${templateInstanceId}`));
  }
}

export function fetchAndShowTemplate(
  currentTemplateNodeLabel,
  parentTemplateInstanceId,
  indexOnParent
) {
  return async (dispatch, getState) => {
    // dispatch() a syncronous action that tells state we are going to fetch data
    return fetch(`http://localhost:3000/templates/template?template_name=${
      currentTemplateNodeLabel}`)
      .then(response => response.json())
      .then(async (response) => {
        let template = response.data.template;
        let templateInstanceId = response.data.templateInstanceId;

        // TODO: check if template is already there?
        dispatch(addTemplatesByNodeLabel([template]));
        // query firestore to get/create document
        await dispatch(findFirestoreIdByTemplateInstanceId(templateInstanceId));
        // apply parent's instructions to child
        dispatch(parseTemplate(
          template,
          templateInstanceId,
          getState().templateInstancesByInstanceId[parentTemplateInstanceId],
          indexOnParent
        ));
        // payload: templateInstanceId to generate state map
        dispatch(addTemplateInstanceStateMap(templateInstanceId));
        // payload: templateInstanceId, and parentTemplateInstanceId
        dispatch(addTemplateInstanceMap(
          templateInstanceId,
          parentTemplateInstanceId,
          indexOnParent
        ));
        dispatch(editTemplateInstance(templateInstanceId));
        dispatch(setActiveTemplate(templateInstanceId));
        return templateInstanceId;
      })
  };
};

function addTemplatesByNodeLabel(templates){
  let templatesByNodeLabel = {};
  templates.forEach((template) => { templatesByNodeLabel[template.node_label[0]] = template });
  return { type: "ADD_TEMPLATES_BY_NODE_LABEL", templatesByNodeLabel };
};

function parseTemplate(
  template,
  templateInstanceId,
  parentTemplateInstance,
  indexOnParent
) {
  let clonedTemplate = clone(template);

  if (parentTemplateInstance) {
    let instructions = parentTemplateInstance.related_nodes[indexOnParent].instructions
    if (instructions) {
      clonedTemplate = applyInstructions(clonedTemplate, instructions);
    }
  }
  return {type: 'ADD_TEMPLATE', template: clonedTemplate, templateInstanceId};
}

function applyInstructions(template, instructions) {
  let obj = template;
  instructions.forEach((instruction) => {
    //TODO: THIS ONLY WORKS FOR BINDING TO THINGS THAT ALREADY EXIST IN OBJ
    // if(instruction.binding){
    //   let bind_source = parseBoundValue(instruction.bind_to);
    //   // attribute is either .node_properties[observable_index] or .related_nodes[observable_index]
    //   let bind_source_attribute = eval(`obj${bind_source}`)
    //   if(bind_source_attribute['observers']){
    //     bind_source_attribute['observers'].push({
    //       instance_id: instanceId,
    //       key: instruction.key,
    //       index: instruction.index
    //     })
    //   } else {
    //     bind_source_attribute['observers'] = [{
    //       instance_id: instanceId,
    //       type: instruction.type,
    //       key: instruction.key,
    //       index: instruction.index
    //     }]
    //   }
    // }
    if(instruction.type == 'node_property'){
      let current_node_property = template.node_properties[instruction.index]
      template.node_properties[instruction.index] = Object.assign(
        {},
        current_node_property,
        instruction.replace_with
      )
    } else if (instruction.type == 'related_node'){
      let current_related_node = template.related_nodes[instruction.index] || {}
      template.related_nodes[instruction.index] = Object.assign(
        {},
        current_related_node,
        instruction.replace_with
      )
    }
  });

  return template;
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

function addTemplateInstanceMap(
  templateInstanceId,
  parentTemplateInstanceId,
  indexOnParent
) {
  return {
    type: 'ADD_TEMPLATE_INSTANCE_MAP',
    templateInstanceId,
    parentTemplateInstanceId,
    indexOnParent,
  };
}

function addTemplateInstanceStateMap(templateInstanceId){
  let templateInstanceStateMap = {
    visible: true,
    submitted: false,
    editingUserIds: [],
  };
  return {
    type: 'MAP_TEMPLATE_INSTANCES_STATE',
    templateInstanceId,
    templateInstanceStateMap
  };
}

export function requestTemplateByName(name){
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/templates/templates_by_name?name='+name)
      .then(response => response.json())
      .then(data => dispatch(addItemsToAutocomplete(data)));
  }
}

export function propertyChanged(templateInstanceId, index, value){
  return (dispatch, getState) => {
    (getState().templateInstancesByInstanceId[templateInstanceId].node_properties[index].observers || []).forEach((observer) => {
      dispatch(updatePropertyValue(observer.instance_id, observer.index, value))
    });
    dispatch(updatePropertyValue(templateInstanceId, index, value))
  }
}

export function updatePropertyValue(templateInstanceId, index, value){
  return { type: "UPDATE_PROPERTY_VALUE", templateInstanceId, index, value };
}

export function relationshipEntityChanged(templateInstanceId, relatedNodeIndex, value, entityIdIndex){
  return (dispatch, getState) => {
    (getState().templateInstancesByInstanceId[templateInstanceId].related_nodes[relatedNodeIndex].observers || []).forEach((observer) => {
      dispatch(updateRelationshipEntityIdArray(observer.instance_id, observer.index, value, entityIdIndex))
    });
    dispatch(updateRelationshipEntityIdArray(templateInstanceId, relatedNodeIndex, value, entityIdIndex))
  }
}

export function updateRelationshipEntityIdArray(templateInstanceId, relatedNodeIndex, value, entityIdIndex){
  return { type: "UPDATE_RELATIONSHIP_VALUE", templateInstanceId, relatedNodeIndex, value, entityIdIndex };
}

export function addItemsToAutocomplete(items){
  return { type: 'ADD_ITEMS_TO_AUTOCOMPLETE', items };
}

export function incrementRelatedNodeCount(templateInstanceId, index){
  return { type: 'INCREMENT_RELATED_NODE_COUNT', templateInstanceId, index };
}

export function updateTemplateInstances(templateInstanceId, node_label) {
  return (dispatch, getState) => {
    fetch('http://localhost:3000/templates/'+node_label)
      .then(response => response.json())
      .then(data => {
        dispatch(addTemplatesByNodeLabel(data));
        dispatch(changeChildRelatedNodeTemplate(
          templateInstanceId,
          node_label,
          getState().templatesByNodeLabel
        ));
      })
  }
}

export function changeChildRelatedNodeTemplate(templateInstanceId, node_label, templatesByNodeLabel){
  return (dispatch, getState) => {
    //pass down potential instructions from the related node
    let instructions = getState().templateInstancesByInstanceId[templateInstanceId.substr(0, templateInstanceId.length - 1)].related_nodes[templateInstanceId.substr(-1)].instructions
    dispatch({ type: 'CHANGE_CHILD_RELATED_NODE_TEMPLATE', templateInstanceId, node_label, templatesByNodeLabel, instructions });
  }
}
