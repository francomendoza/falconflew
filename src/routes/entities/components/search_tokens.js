import React from 'react';
import EntityCard from './entity_card';

export default class SearchTokens extends React.Component {
  render() {
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
}
