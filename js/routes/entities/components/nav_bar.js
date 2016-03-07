import React from 'react';
import { Link } from 'react-router';

var NavBar = React.createClass({

  render: function() {
    return <div style = { { height: "20px", padding: "10px" } }>
      <Link to = { '/entities' } style = { { padding: "10px" } }>Entities</Link>
      <Link to = { '/grid' }>Grid</Link>
    </div>
  }
});

module.exports = NavBar;
