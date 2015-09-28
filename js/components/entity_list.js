var React = require('react');
import { connect } from 'react-redux';
// var Reflux = require('reflux');
// var EntityStore = require('./../stores/entity_store');

var EntityList = React.createClass({
  // mixins: [Reflux.connect(EntityStore)],

  render: function() {
    console.log('I love weenis')
    console.log(this.props);
    return <div>
      <h2>Entities</h2>
      <ul>
        {this.props.entities.map(function(entity) {
           return <li key = {entity.node_label}>{entity.node_properties[0].value} ({entity.node_label})</li>
        })}
      </ul>
    </div>;
  }
});

function mapStateToProps(state){
  return {
    entities: state.entities
  }
}

// module.exports = EntityList;
export default connect(mapStateToProps)(EntityList);
