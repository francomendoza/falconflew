var FormActions = require('./../actions/form_actions');

var EntityStore = Reflux.createStore({
  listenables: [FormActions],
  getInitialState: function(){
    return {e: entities}
  },

  updateState: function(newState){

  },

  next_index: function(){
    return entities.length + 1;
  },

  onSubmitNodeForm: function(obj){
    console.log(obj);
    // new_obj = obj.entity_template;
    // new_obj[id] = getNextId();
    entities.push(_.merge(obj, {entity_id: this.next_index()} ));

    this.trigger(entities);
  },
  onUpdateFormElement: function(obj){
    this.trigger(obj);
  }
});

module.exports = EntityStore;
