import React from 'react';
import EntityCard from './entity_card';

var EntitySearchResults = React.createClass({
  render: function() {
    return <div>
      <div>Entity Search Results</div>
      {this.props.entitySearchResults.map((entity) => {
        return <EntityCard entity = {entity} 
                  key={entity.entity_id}
                  onClickHandler={ ()=>{ return null } } />
      })}
    </div>
  }
});

module.exports = EntitySearchResults