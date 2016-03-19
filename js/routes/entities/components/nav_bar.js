import React from 'react';
import { Link } from 'react-router';

var NavBar = React.createClass({

  render: function() {
    return <div style = { { height: "50px", padding: "10px" } }>
      <Link to = { '/template' } style = { { padding: "10px" } }>Original Templates</Link>
      <Link to = { '/entities' } style = { { padding: "10px" } }>Entities</Link>
      <Link to = { '/grid' } style = { { padding: "10px" } }>Grid</Link>
      <Link to = { '/graph' } style = { { padding: "10px" } }>Templates</Link>
    </div>
  }
});

module.exports = NavBar;
// 10.69.116.102 Ipms.1234
