export function submitForm(node_obj){
  return { type: "SUBMIT_FORM", node_obj };
}

export function updatePropertyValue(property_section){
  return { type: "UPDATE_PROPERTY_VALUE", property_section };
}

export function toggleFormVisibility(var1){
  return { type: "TOGGLE_FORM_VISIBILITY", var1 };
}
