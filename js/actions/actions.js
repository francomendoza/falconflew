export function submitForm(node_obj){
  return { type: "SUBMIT_FORM", node_obj };
}

export function updatePropertyValue(property_section){
  return { type: "UPDATE_PROPERTY_VALUE", property_section };
}

export function toggleFormVisibility(templateInstanceId){
  return { type: "TOGGLE_FORM_VISIBILITY", templateInstanceId};
}

export function updateTemplateMap(templateId){
  return { type: "ADD_TEMPLATE_TO_MAP", templateId };
}

export function setInitialTemplateInstances(templateId){
  return { type: "SET_INITIAL_TEMPLATE_INSTANCES", templateId }
};