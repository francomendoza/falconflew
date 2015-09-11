var RelationshipFormElement = React.createClass({

  mixins: [Reflux.connect(EntityStore)],

  getInitialState: function(){
     return {is_creating: false}
  },

  handleChange: function(event){
    var obj = this.props.related_node;
    obj.data.entity_id = event.target.value;
    obj.index = this.props.index;
    obj.related_node = true;
    this.props.updateParentState(obj);
  },

  newEntityForm() {
    this.setState({is_creating: true});
    this.props.updateParentBackground();
  },

  render: function(){
    var that = this;
    var template_form;
    var entities_for_template = _.filter(this.state.e, function(entity){
      return entity.template_id === that.props.related_node.data.template_id;
    })
    if(this.state.is_creating){
      template_form = <TemplateForm params={{template_id: this.props.related_node.data.template_id}} subform={true}/>
    }
    return (
      <div className="relationship_element">
        <div style={{padding: "10px"}}>
          <label>{this.props.related_node.data.template_id}: </label>
          <select onChange={this.handleChange}>
            {entities_for_template.map(function(entity, index){
              return <option value={entity.id} key={index}>{entity.name}</option>;
            })}
          </select>
          <button onClick={this.newEntityForm}>Create New</button>
        </div>
        {template_form}
      </div>
    );
  }
});
