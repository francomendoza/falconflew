import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {
  signOut,
} from '../../../modules/auth/actions';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'white',
    padding: "10px",
  }
}

class NavBar extends React.Component {
  render() {
    let authLink = <Button>
      <Typography>
        <Link to='/sign_in' style={styles.link}>Sign In</Link>
      </Typography>
    </Button>

    if (this.props.currentUserId) {
      authLink = <Button
        onClick={() => this.props.dispatch(signOut())}
      >
        <Typography style={{color: 'white'}}>Sign Out</Typography>
      </Button>
    }

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
          {authLink}
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUserId,
  };
};

export default connect(mapStateToProps)(NavBar);
