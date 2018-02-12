import React from 'react';
import EntitySearch from './entity_search';
import EntityShowPage from './entity_show_page';

export default class EntityPage extends React.Component {
  render() {
    return <div>
      <EntitySearch />
      <EntityShowPage />
    </div>
  }
}
