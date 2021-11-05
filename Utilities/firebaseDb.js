

import * as firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCPf5QcFi2K6hDyk-oLhjSB4TtOTu8T34E",
    authDomain: "reactnative-74cfd.firebaseapp.com",
    projectId: "reactnative-74cfd",
    storageBucket: "reactnative-74cfd.appspot.com",
    messagingSenderId: "669615957078",
    appId: "1:669615957078:web:783d109db9a44304b8c7f7"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({experimentalForceLongPolling: true})

export default firebase