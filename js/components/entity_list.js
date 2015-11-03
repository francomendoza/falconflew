var React = require('react');
import { connect } from 'react-redux';

var EntityList = React.createClass({

  render: function() {
    console.log(this.props);
    return <div>
      <h2>Entities</h2>
      <ul>
        {this.props.entities.map(function(entity) {
           return <li key = { entity.entity_id } >{entity.node_properties[0].value} ({entity.node_label[0]})</li>
        })}
      </ul>
    </div>;
  }
});

function mapStateToProps(state){
  return {
    entities: state.updateEntities
  }
}

export default connect(mapStateToProps)(EntityList);
