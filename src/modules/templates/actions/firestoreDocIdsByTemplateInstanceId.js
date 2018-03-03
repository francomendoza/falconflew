import firestore from '../../../initializers/firebase';

const collection = firestore.collection('EditingUserIdsByTemplateInstanceId');

export function findFirestoreIdByTemplateInstanceId(templateInstanceId) {
  return async (dispatch, getState) => {
    // TODO: clean up this logic, its nested and groce AF
    let querySnapshot = await collection.where('templateInstanceId', '==', templateInstanceId)
      .get();

    let found = querySnapshot.size > 0;
    if (found) {

      let docs = querySnapshot.docs.map((doc) => {
        return processDoc(doc, templateInstanceId, dispatch);
      });

      return docs;
    } else {
      let editingUserIds = [];
      let newDocRef = await collection.add({
        templateInstanceId,
        editingUserIds,
      });
      let newDoc = await newDocRef.get();
      return processDoc(newDoc, templateInstanceId, dispatch);
    }
  }
}

function processDoc(doc, templateInstanceId, dispatch) {
  dispatch(addFirestoreIdsByTemplateInstanceIds(
    templateInstanceId,
    doc.id
  ));
  // 1. inject the editors from firebase to redux state
  dispatch(setEditingUsers(templateInstanceId, doc.data().editingUserIds));
  // 2. add listener that update redux state anytime editors change
  doc.ref.onSnapshot((actualDoc) => {
    dispatch(setEditingUsers(templateInstanceId, actualDoc.data().editingUserIds));
  });
}

function addFirestoreIdsByTemplateInstanceIds(templateInstanceId, firestoreDocId) {
  return {type: 'ADD_TEMPLATE_INSTANCE', templateInstanceId, firestoreDocId};
}

export function setEditingUsers(templateInstanceId, editingUserIds) {
  return {type: 'SET_EDITING_USERS', templateInstanceId, editingUserIds};
}
