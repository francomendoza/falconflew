var EntityStore = Reflux.createStore({
  listenables: [FormActions],
  updateState: function(newState){

  },
  onSubmitNodeForm: function(obj){
    console.log(obj);
    entities.push({
      entity_name: obj.name,
      template_name: obj.template_name
    });
    this.trigger(entities);
  },
  onUpdateFormElement: function(obj){
    this.trigger(obj);
  }
});
