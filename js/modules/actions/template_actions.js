import fetch from 'isomorphic-fetch';
import { pushState } from 'redux-router';

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
        dispatch(submitEntityForm(data, templateInstanceId));
    })
      .then(() => { if(templateInstanceId === 'x0') { dispatch(pushState(null, '/', null))  }});
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

export function setActiveTemplate(templateInstanceId){
  return { type: "SET_ACTIVE_TEMPLATE", templateInstanceId }
}

export function clearTemplates(){
  return { type: 'CLEAR_TEMPLATES' }
}

export function retrieveTemplates(currentTemplateNodeLabel){
  return (dispatch, getState) => {
    // dispatch() a syncronous action that tells state we are going to fetch data
    dispatch(clearTemplates())
    return fetch('http://localhost:3000/templates/'+currentTemplateNodeLabel)
      .then(response => response.json())
      .then(data => {
        dispatch(addTemplatesByNodeLabel(data, currentTemplateNodeLabel));
      })
      .then(() => dispatch(pushState(null, '/template_form/'+currentTemplateNodeLabel)));
  };
};

export function addTemplatesByNodeLabel(templates, currentTemplateNodeLabel){
  let templatesByNodeLabel = {};
  templates.forEach((template) => { templatesByNodeLabel[template.node_label[0]] = template });
  return { type: "ADD_TEMPLATES_BY_NODE_LABEL", templatesByNodeLabel, currentTemplateNodeLabel };
};

export function requestTemplateByName(name){
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/templates/templates_by_name?name='+name)
      .then(response => response.json())
      .then(data => dispatch(addItemsToAutocomplete(data)));
  }
}

export function updatePropertyValue(templateInstanceId, index, value){
  return { type: "UPDATE_PROPERTY_VALUE", templateInstanceId, index, value };
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
    dispatch(changeChildRelatedNodeTemplate(templateInstanceId, node_label, getState().templatesByNodeLabel));
  }
}

export function changeChildRelatedNodeTemplate(templateInstanceId, node_label, templatesByNodeLabel){
  return { type: 'CHANGE_CHILD_RELATED_NODE_TEMPLATE', templateInstanceId, node_label, templatesByNodeLabel}
}