import React from 'react';
import {connect} from 'react-redux';
import EntityCard from './entity_card';
import { selectEntityCard } from '../../../modules/entities/actions/entity_actions';

class EntityShowPage extends React.Component {
  render() {
    if(this.props.shownEntity.entity){
        let entity = this.props.shownEntity.entity
        return <div>
          <EntityCard entity={entity}
            key={entity.entity_id}
            dispatch = {this.props.dispatch}
            available_actions = { this.props.childTemplatesByEntityId[entity.entity_id] || [] }
            onClickHandler = { () => { this.props.dispatch(selectEntityCard(entity.entity_id)) } }/>
          { this.props.shownEntity.related_entities.map((details, index) => {
              return <div key = { index } style={{float: "left"}}>
              <h3>{details.relationship}</h3>
              { details.entities.map((entity) => {
                  return <EntityCard entity={entity}
                    key = { entity.entity_id }
                    dispatch = { this.props.dispatch }
                    available_actions = { this.props.childTemplatesByEntityId[entity.entity_id] || [] }
                    onClickHandler = { () => { this.props.dispatch(selectEntityCard(entity.entity_id)) } }/>
               })}
              </div>;
            })}
        </div>
    } else {
      return <div></div>
    }
  }
}

function mapStateToProps(state) {
  return {
    shownEntity: state.shownEntity,
    childTemplatesByEntityId: state.childTemplatesByEntityId
  }
}

export default connect(mapStateToProps)(EntityShowPage);
