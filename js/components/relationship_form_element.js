var RelationshipFormElement = React.createClass({

  mixins: [Reflux.connect(EntityStore)],

  getInitialState: function(){
     return {is_creating: false}
  },

  handleChange: function(event){
    var obj = this.props.related_node;
    obj.entity_id = event.target.value
    this.props.updateParentState(obj);
  },

  newEntityForm() {
    this.setState({is_creating: true})
  },

  render: function(){
    var that = this;
    var template_form;
    var entities_for_template = _.filter(this.state.e, function(entity){
      return entity.template_id === that.props.related_node.template_id;
    })
    if(this.state.is_creating){
      template_form = <TemplateForm params={{template_id: this.props.related_node.template_id}} subform={true}/>
    }
    return (
      <div>
        <select onChange={this.handleChange}>
          {entities_for_template.map(function(entity){
            return <option value={entity.id}>{entity.name}</option>;
          })}
        </select>
        <button onClick={this.newEntityForm}>Create New</button>
        {template_form}
      </div>
    );
  }
});
