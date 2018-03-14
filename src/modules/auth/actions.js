import { routeActions } from 'react-router-redux';

export function signInAndRedirect(userId) {
  return (dispatch) => {
    dispatch(signIn(userId));
    dispatch(routeActions.push(`/`));
  }
}

function signIn(userId) {
  return {type: 'SIGN_IN', userId};
}

export function signOut() {
  return {type: 'SIGN_OUT'};
}
