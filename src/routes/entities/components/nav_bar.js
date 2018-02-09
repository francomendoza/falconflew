import React from 'react';
import { Link } from 'react-router';

var NavBar = React.createClass({

  render: function() {
    return (
      <div style = { { height: "50px", padding: "10px" } }>
        <Link to = { '/template' } style = { { padding: "10px" } }>Original Templates</Link>
        <Link to = { '/entities' } style = { { padding: "10px" } }>Entities</Link>
        <Link to = { '/grid' } style = { { padding: "10px" } }>Grid</Link>
        <Link to = { '/graph' } style = { { padding: "10px" } }>Templates</Link>
        <Link to = { '/notebook' } style = { { padding: "10px" } }>Notebook</Link>
      </div>
    )
  }
});

export default NavBar;
