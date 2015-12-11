import React from 'react';
import { Link } from 'react-router';

var NavBar = React.createClass({

  render: function() {
    return <div>
      <Link to = { '/entities' }>Entities</Link>
    </div>
  }
});

module.exports = NavBar;