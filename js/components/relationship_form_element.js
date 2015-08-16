var RelationshipFormElement = React.createClass({
  render: function(){
    var that = this;
    var entities_for_template = _.filter(entities, function(entity){
      return entity.template_name === that.props.template_name;
    })
    return (
      <div>
        <select>
          {entities_for_template.map(function(entity){
            return <option>{entity.entity_name}</option>;
          })}
        </select>
      </div>
    );
  }
});
