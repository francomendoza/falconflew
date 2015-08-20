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
           return <li key = {entity.name}>{entity.name}</li>
          })}
        </ul>
      </div>;
  }
});
