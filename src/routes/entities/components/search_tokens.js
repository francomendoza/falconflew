import React from 'react';
import EntityCard from './entity_card';

var SearchTokens = React.createClass({

  render: function() {
    return <div>
      { this.props.displayedTokens.map((entity) => {
         return <EntityCard
            entity={entity}
            key={entity.entity_id}
            onClickHandler={()=>{return null}}/>
        })
      }
    </div>
  }
})

export default SearchTokens;
