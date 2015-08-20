var EntityStore = Reflux.createStore({
  listenables: [FormActions],
  getInitialState: function(){
    return {e: entities}
  },

  updateState: function(newState){

  },
  onSubmitNodeForm: function(obj){
    console.log(obj);
    entities.push({
      name: obj.name,
      template_id: obj.id
    });
        
    this.trigger(entities);
  },
  onUpdateFormElement: function(obj){
    this.trigger(obj);
  }
});
