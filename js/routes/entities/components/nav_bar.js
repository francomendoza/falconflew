import React from 'react';
import { Link } from 'react-router';

var NavBar = React.createClass({

  render: function() {
    return <div>
      <Link to = { '/entities' } style = { { padding: "10px" } }>Entities</Link>
      <Link to = { '/grid' }>Grid</Link>
    </div>
  }
});

module.exports = NavBar;
