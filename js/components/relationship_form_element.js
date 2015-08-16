var RelationshipFormElement = React.createClass({

  getInitialState: function(){
    return {is_creating: false}
  },

  newEntityForm() {
    this.setState({is_creating: true})
  },

  render: function(){
    var that = this;
    var template_form;
    var entities_for_template = _.filter(entities, function(entity){
      return entity.template_name === that.props.template_name;
    })
    if(this.state.is_creating){
      template_form = <TemplateForm template_id={this.props.template_id}/>
    }
    return (
      <div>
        <select>
          {entities_for_template.map(function(entity){
            return <option>{entity.entity_name}</option>;
          })}
        </select>
        <button onClick={this.newEntityForm}>Create New</button>
        {template_form}
      </div>
    );
  }
});
