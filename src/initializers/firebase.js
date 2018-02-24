const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: 'AIzaSyAo7TEdR5pRFfA6v2BcUX1Imgry4-xBiAs',
  authDomain: 'falconflew-firebase.firebaseapp.com',
  projectId: 'falconflew-firebase',
});

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();
export default firestore;
