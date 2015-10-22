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

export function autocompleteEntitiesByLabel(label, value){
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/entities/autocomplete?type=${label}&term=${value}`)
      .then(response => response.json())
      .then(data => dispatch(addEntitiesByLabel(data, label)))
  }
}

export function addEntitiesByLabel(entities, label){
  return { type: "ADD_ENTITIES_BY_LABEL", entities, label }
}

export function updatePropertyValue(templateInstanceId, index, value){
  return { type: "UPDATE_PROPERTY_VALUE", templateInstanceId, index, value };
}

export function updateRelationshipEntityId(templateInstanceId, index, value){
  return { type: "UPDATE_RELATIONSHIP_VALUE", templateInstanceId, index, value };
}

export function toggleFormVisibility(templateInstanceId){
  return { type: "TOGGLE_FORM_VISIBILITY", templateInstanceId };
}

export function updateTemplateMap(templateId){
  return { type: "ADD_TEMPLATE_TO_MAP", templateId };
}

export function setActiveTemplate(templateInstanceId){
  return { type: "SET_ACTIVE_TEMPLATE", templateInstanceId }
};

export function retrieveTemplates(currentTemplateId){
  return (dispatch, getState) => {
    // dispatch() a syncronous action that tells state we are going to fetch data
    return fetch('http://localhost:3000/templates/'+currentTemplateId)
      .then(response => response.json())
      .then(data => {
        dispatch(addTemplatesById(data, currentTemplateId));
      })
      .then(() => dispatch(pushState(null, '/template_form/'+currentTemplateId)));
  };
};

export function addTemplatesById(templates, currentTemplateId){
  let templatesById = {};
  templates.forEach((template) => { templatesById[template._id["$oid"]] = template });
  return { type: "ADD_TEMPLATES_BY_ID", templatesById, currentTemplateId };
};

export function requestTemplateByName(name){
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/templates/templates_by_name?name='+name)
      .then(response => response.json())
      .then(data => dispatch(addItemsToAutocomplete(data)));
  }
}

export function addItemsToAutocomplete(items){
  return { type: 'ADD_ITEMS_TO_AUTOCOMPLETE', items }
}
