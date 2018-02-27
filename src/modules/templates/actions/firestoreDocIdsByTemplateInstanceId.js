import firestore from '../../../initializers/firebase';

const collection = firestore.collection('EditingUserIdsByTemplateInstanceId');

export function findFirestoreIdByTemplateInstanceId(templateInstanceId) {
  return (dispatch, getState) => {
    // TODO: clean up this logic, its nested and groce AF
    collection.where('templateInstanceId', '==', templateInstanceId)
    .get()
    .then((querySnapshot) => {
      let found = querySnapshot.size > 0;
      if (found) {
        querySnapshot.forEach((doc) => {
          dispatch(addFirestoreIdsByTemplateInstanceIds(
            templateInstanceId,
            doc.id
          ));
          // 1. inject the editors from firebase to redux state
          dispatch(setEditingUsers(templateInstanceId, doc.data().editingUserIds));
          // 2. add listener that update redux state anytime editors change
          collection.doc(doc.id).onSnapshot((doc2) => {
            dispatch(setEditingUsers(templateInstanceId, doc2.data().editingUserIds));
          });
        });
      } else {
        let editingUserIds = [];
        collection.add({
          templateInstanceId,
          editingUserIds,
        })
        .then((docRef) => {
          dispatch(addFirestoreIdsByTemplateInstanceIds(
            templateInstanceId,
            docRef.id
          ));
          // 1. inject the editors from firebase to redux state
          dispatch(setEditingUsers(templateInstanceId, editingUserIds));
          // 2. add listener that update redux state anytime editors change
          docRef.onSnapshot((docRef2) => {
            dispatch(setEditingUsers(templateInstanceId, editingUserIds));
          });
        });
      }
    });
  }
}

function addFirestoreIdsByTemplateInstanceIds(templateInstanceId, firestoreDocId) {
  return {type: 'ADD_TEMPLATE_INSTANCE', templateInstanceId, firestoreDocId};
}

export function setEditingUsers(templateInstanceId, editingUserIds) {
  return {type: 'SET_EDITING_USERS', templateInstanceId, editingUserIds};
}
