import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

var NavBar = React.createClass({

  render: function() {
    return (
      <AppBar>
        <Toolbar>
          <Typography>
            <Link to = { '/template' } style = { { padding: "10px" } }>Original Templates</Link>
          </Typography>
          <Typography>
            <Link to = { '/entities' } style = { { padding: "10px" } }>Entities</Link>
          </Typography>
          <Typography>
            <Link to = { '/grid' } style = { { padding: "10px" } }>Grid</Link>
          </Typography>
          <Typography>
            <Link to = { '/graph' } style = { { padding: "10px" } }>Templates</Link>
          </Typography>
          <Typography>
            <Link to = { '/notebook' } style = { { padding: "10px" } }>Notebook</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
});

export default NavBar;
