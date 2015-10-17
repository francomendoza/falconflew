import fetch from 'isomorphic-fetch';
import { pushState } from 'redux-router';

export function submitForm(templateInstanceId){
  return (dispatch, getState) => {
    console.log(getState().templateInstancesByInstanceId[templateInstanceId])
    return fetch('http://localhost:3000/entities/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify(getState().templateInstancesByInstanceId[templateInstanceId])
    }).then({ type: "SUBMIT_FORM", node_obj });
  }
}

export function updatePropertyValue(property_section){
  return { type: "UPDATE_PROPERTY_VALUE", property_section };
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
