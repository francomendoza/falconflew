var EntityStore = Reflux.createStore({
  listenables: [FormActions],
  getInitialState: function(){
    return {e: entities}
  },

  updateState: function(newState){

  },
  
  onSubmitNodeForm: function(obj){
    console.log(obj);
    // new_obj = obj.entity_template;
    // new_obj[id] = getNextId();
    entities.push(obj);

    this.trigger(entities);
  },
  onUpdateFormElement: function(obj){
    this.trigger(obj);
  }
});
