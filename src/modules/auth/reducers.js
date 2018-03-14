export function currentUserId(state = null, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return action.userId;
    default:
      return state;
  }
}
