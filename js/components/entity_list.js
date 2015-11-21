var React = require('react');
import { connect } from 'react-redux';
import EntityCard from './entity_card';
import { selectEntityCard } from '../actions/actions';

var EntityList = React.createClass({

  render: function() {

    return <div>
      <h2>Entities</h2>
        {this.props.entities.map((entity) => {
           return <EntityCard 
            key = { entity.entity_id }
            entity = { entity } 
            onClickHandler = { () => { this.props.dispatch(selectEntityCard(entity.entity_id)) } }/>
        })}
    </div>;
  }
});

function mapStateToProps(state){
  return {
    entities: state.updateEntities
  }
}

export default connect(mapStateToProps)(EntityList);
