import React from 'react';
import EntitySearch from './entity_search';
import EntityShowPage from './entity_show_page';

var EntityPage = React.createClass({

  render: function() {
    return <div>
      <EntitySearch />
      <EntityShowPage />
    </div>
  }
});

export default EntityPage;