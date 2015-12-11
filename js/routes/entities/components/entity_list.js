var React = require('react');
import { connect } from 'react-redux';
import EntityCard from './entity_card';
import { selectEntityCard } from '../../../modules/entities/actions/entity_actions';

var EntityList = React.createClass({

  render: function() {

    return <div>
      <h2>Entities</h2>
        {this.props.entities.map((entity) => {
           return <EntityCard 
            key = { entity.entity_id }
            entity = { entity } 
            dispatch = { this.props.dispatch }
            available_actions = { this.props.childTemplatesByEntityId[entity.entity_id] || [] } 
            onClickHandler = { () => { this.props.dispatch(selectEntityCard(entity.entity_id)) } }/>
        })}
    </div>;
  }
});

function mapStateToProps(state){
  return {
    entities: state.updateEntities,
    childTemplatesByEntityId: state.childTemplatesByEntityId
  }
}

export default connect(mapStateToProps)(EntityList);
