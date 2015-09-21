var Reflux = require('reflux');
var _ = require('lodash');
var FormActions = require('./../actions/form_actions');

var EntityStore = Reflux.createStore({
  listenables: [FormActions],

  onInitCompleted: function(){
    var entities = [];
    var localStorageEntities = this.getEntities();
    if(localStorageEntities !== null || localStorageEntities !== undefined) {
      entities = localStorageEntities;
    } else {
      this.initializeEntities();
    }
    this.trigger(entities)
  },
  getInitialState: function(){
    var entities = [];
    var localStorageEntities = this.getEntities();
    if(localStorageEntities !== null || localStorageEntities !== undefined) {
      entities = localStorageEntities;
    } else {
      this.initializeEntities();
    }
    return {e: entities}
  },

  getEntities: function(){
    JSON.parse(localStorage.getItem('entities'));
  },

  setEntities: function(entities){
    localStorage.setItem('entities', JSON.stringify(entities));
  },

  initializeEntities: function(){
    this.setEntities([]);
  },

  addEntity: function(entity){
    var localStorageEntities = this.getEntities();
    localStorageEntities.push(_.merge(entity, {entity_id: this.next_index()} ));
    this.setEntities(localStorageEntities);
  },

  updateState: function(newState){

  },

  next_index: function(){
    return entities.length + 1;
  },

  onSubmitNodeForm: function(obj){
    this.addEntity(obj);

    this.trigger(this.getEntities());
  },

  onUpdateFormElement: function(obj){
    this.trigger(obj);
  }
});

module.exports = EntityStore;
