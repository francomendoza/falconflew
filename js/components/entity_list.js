var EntityList = React.createClass({
 mixins: [Reflux.connect(EntityStore)],

 getInitialState: function() {
     return {entities: entities}
  },

  render: function() {
    return <div>
        <h2>Entities</h2>
        <ul>
          {this.state.entities.map(function(entity) {
           return <li key = {entity.node_label}>{entity.node_properties[0].value} ({entity.node_label})</li>
          })}
        </ul>
      </div>;
  }
});
