import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'white',
    padding: "10px",
  }
}
export default class NavBar extends React.Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Button
          >
            <Typography>
              <Link to = { '/template' } style={styles.link}>Original Templates</Link>
            </Typography>
          </Button>
          <Button
          >
            <Typography>
              <Link to = { '/entities' } style={styles.link}>Entities</Link>
            </Typography>
          </Button>
          <Button
          >
            <Typography>
              <Link to = { '/grid' } style={styles.link}>Grid</Link>
            </Typography>
          </Button>
          <Button
          >
            <Typography>
              <Link to = { '/graph' } style={styles.link}>Templates</Link>
            </Typography>
          </Button>
          <Button
          >
            <Typography>
              <Link to = { '/notebook' } style={styles.link}>Notebook</Link>
            </Typography>
          </Button>
          <Button
          >
            <Typography>
              <Link to='/sign_in' style={styles.link}>Sign In</Link>
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}
