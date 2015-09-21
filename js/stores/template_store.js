var Reflux = require('reflux');
var _ = require('lodash');
var FormActions = require('./../actions/form_actions');

var TemplateStore = Reflux.createStore({
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
});

module.exports = TemplateStore;
