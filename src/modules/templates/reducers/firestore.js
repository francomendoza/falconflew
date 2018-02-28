export function firebaseDocIdsByTemplateInstanceId(state={}, action) {
  switch (action.type) {
    case 'ADD_TEMPLATE_INSTANCE':
      return Object.assign({}, state, {
        [action.templateInstanceId]: action.firestoreDocId
      });
    default:
      return state;
  }
}
