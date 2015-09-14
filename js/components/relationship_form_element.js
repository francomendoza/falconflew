var EntityStore = require('./../stores/entity_store');
var Autocomplete = require('./autocomplete');
var TemplateForm = require('./template_form');

var RelationshipFormElement = React.createClass({

  mixins: [Reflux.listenTo(EntityStore, 'onEntityAdded')],

  getInitialState: function(){
    var matching_entities = this.getEntitiesForTemplate(entities);
    var entity_id = null;
    if(matching_entities.length > 0) {
        entity_id = matching_entities[0].entity_id;
    }
    return {is_creating: false, value: entity_id}
  },

  handleChange: function(event){
    this.setState({value: event.target.value});
    this.triggerUpdateForParent();
  },

  triggerUpdateForParent: function() {
    var obj = this.props.related_node;
    obj.data.entity_id = this.state.value;
    obj.index = this.props.index;
    obj.related_node = true;
    this.props.updateParentState(obj);
  },

  newEntityForm: function() {
    this.setState({is_creating: true});
    this.props.updateParentBackground();
  },
  getTemplateById: function(id) {
    return _.find(templates, function(template) { return template.template_id === id; }) || {node_label: ''};
  },

  getEntitiesForTemplate: function(these_entities) {
    var that = this;
    return _.filter(these_entities, function(entity){
      return entity.template_id === that.props.related_node.data.template_id;
    });
  },

  onEntityAdded: function(updated_entities) {
    new_entities = this.getEntitiesForTemplate(updated_entities);
    this.setState({value: _.last(new_entities).entity_id});
    this.triggerUpdateForParent();
  },
          //<select value={this.state.value} onChange={this.handleChange}>
            //{entities_for_template.map(function(entity, index){
              //return <option value={entity.entity_id} key={index}>{entity.node_properties[0].value}</option>;
            //})}
          //</select>

  render: function(){
    var that = this;
    var template_form;
    var entities_for_template = this.getEntitiesForTemplate(entities);
    if(this.state.is_creating){
      template_form = <TemplateForm params={{template_id: this.props.related_node.data.template_id}} subform={true}/>
    }
    return (
      <div className="relationship_element">
        <div style={{padding: "10px"}}>
          <label>{this.getTemplateById(this.props.related_node.data.template_id).node_label}: </label>
          <Autocomplete options={[{value: 1, label: 'Test'}]} />
          <button onClick={this.newEntityForm}>Create New</button>
        </div>
        {template_form}
      </div>
    );
  }
});

module.exports = RelationshipFormElement;
