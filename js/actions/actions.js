// var Reflux = require('reflux');

// var FormActions = Reflux.createActions([
//   "submitNodeForm",
//   "updateFormElement"
// ]);

// module.exports = FormActions;

export function submitForm(node_obj){
  return { type: "SUBMIT_FORM", node_obj };
}
