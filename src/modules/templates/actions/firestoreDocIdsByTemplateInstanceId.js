import firestore from '../../../initializers/firebase';

const collection = firestore.collection('EditingUserIdsByTemplateInstanceId');

export function findFirestoreIdByTemplateInstanceId(templateInstanceId) {
  return (dispatch, getState) => {
    // TODO: clean up this logic, its nested and groce AF
    f(templateInstanceId, dispatch);
  }
}

async function f(templateInstanceId, dispatch) {
  let query = await collection.where('templateInstanceId', '==', templateInstanceId)
    .get();

  await processQuery(query, templateInstanceId, dispatch);
}

async function processQuery(querySnapshot, templateInstanceId, dispatch) {
  let found = querySnapshot.size > 0;
  if (found) {
    async function processFoundDoc(docRef) {
      let doc = await collection.doc(docRef.id).get();
      processDoc(doc, templateInstanceId, dispatch);
    }

    querySnapshot.forEach(processFoundDoc);
  } else {
    let editingUserIds = [];
    let newDoc = await collection.add({
      templateInstanceId,
      editingUserIds,
    });
    processDoc(newDoc, templateInstanceId, dispatch);
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
    dispatch(setEditingUsers(templateInstanceId, doc.data().editingUserIds));
  });
}

function addFirestoreIdsByTemplateInstanceIds(templateInstanceId, firestoreDocId) {
  return {type: 'ADD_TEMPLATE_INSTANCE', templateInstanceId, firestoreDocId};
}

export function setEditingUsers(templateInstanceId, editingUserIds) {
  return {type: 'SET_EDITING_USERS', templateInstanceId, editingUserIds};
}
