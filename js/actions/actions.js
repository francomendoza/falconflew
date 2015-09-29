// var Reflux = require('reflux');

// var FormActions = Reflux.createActions([
//   "submitNodeForm",
//   "updateFormElement"
// ]);

// module.exports = FormActions;

export function submitForm(node_obj){
  return { type: "SUBMIT_FORM", node_obj };
}

export function updatePropertyValue(property_section){
  return { type: "UPDATE_PROPERTY_VALUE", property_section };
}
