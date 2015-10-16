import fetch from 'isomorphic-fetch';

export function submitForm(node_obj){
  return { type: "SUBMIT_FORM", node_obj };
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

export function setInitialTemplateInstances(templateId){
  return { type: "SET_INITIAL_TEMPLATE_INSTANCES", templateId }
};

export function setActiveTemplate(templateInstanceId){
  return { type: "SET_ACTIVE_TEMPLATE", templateInstanceId }
};

export function retrieveTemplates(currentTemplateId){
  return (dispatch, getState) => {
    // dispatch() a syncronous action that tells state we are going to fetch data
    var myInit = { method: 'GET',
               mode: 'cors',
               cache: 'default' };
    return fetch('http://localhost:3000/template/'+currentTemplateId)
      .then(response => response.json())
      .then(data => {
        dispatch(addTemplatesById(data));
      });
  };
};

export function addTemplatesById(templates){
  let templatesById = {};
  templates.forEach((template) => { templatesById[template._id["$oid"]] = template });
  return { type: "ADD_TEMPLATES_BY_ID", templatesById };
};
