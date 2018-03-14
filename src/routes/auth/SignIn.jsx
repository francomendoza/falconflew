import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {
  signIn,
} from '../../modules/auth/actions';

class SignIn extends React.Component {

  state = {
    username: null,
    password: null,
  }

  users = [
    {
      id: 1,
      username: 'franco',
      password: 'pass',
    },
    {
      id: 2,
      username: 'alex',
      password: 'pass',
    },
  ]

  onUsernameChange = (evt) => {
    this.setState({username: evt.target.value});
  }

  onPasswordChange = (evt) => {
    this.setState({password: evt.target.value});
  }

  signIn = () => {
    let user = this.users.find((user) => {
      return this.state.username === user.username;
    })

    this.props.dispatch(signIn(user.id));
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 2*64px)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          label='Username'
          onChange={this.onUsernameChange}
          margin='normal'
        />
        <TextField
          label='Password'
          type='password'
          onChange={this.onPasswordChange}
          margin='normal'
        />
        <Button
          variant='raised'
          onClick={this.signIn}
        >Sign In</Button>
      </div>
    );
  }
}

SignIn.propTypes = {
}

export default connect()(SignIn);
