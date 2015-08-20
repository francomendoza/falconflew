var RelationshipFormElement = React.createClass({

  mixins: [Reflux.connect(EntityStore)],

  // getInitialState: function(){
  //   return {is_creating: false}
  // },

  newEntityForm() {
    this.setState({is_creating: true})
  },

  render: function(){
    var that = this;
    var template_form;
    var entities_for_template = _.filter(this.state.e, function(entity){
      return entity.template_id === that.props.template_id;
    })
    if(this.state.is_creating){
      template_form = <TemplateForm params={{template_id: this.props.template_id}} subform={true}/>
    }
    return (
      <div>
        <select>
          {entities_for_template.map(function(entity){
            return <option>{entity.name}</option>;
          })}
        </select>
        <button onClick={this.newEntityForm}>Create New</button>
        {template_form}
      </div>
    );
  }
});
