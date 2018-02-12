import React from 'react';
import EntityCard from './entity_card';

export default class EntitySearchResults extends React.Component {
  render() {
    return <div>
      <div>Entity Search Results</div>
      {this.props.entitySearchResults.map((entity) => {
        return <EntityCard entity = {entity}
                  key={entity.entity_id}
                  onClickHandler={ () => { return null } } />
      })}
    </div>
  }
}
