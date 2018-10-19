import * as firebase from 'firebase';   

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDAoT80f1if4xgHXDPi7-4cEV8636GuB6A",
    authDomain: "muneeb-78bf2.firebaseapp.com",
    databaseURL: "https://muneeb-78bf2.firebaseio.com",
    projectId: "muneeb-78bf2",
    storageBucket: "muneeb-78bf2.appspot.com",
    messagingSenderId: "541193804798"
  };
  firebase.initializeApp(config);

  const db = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);
  
  //export db from here for using it in all page like im using firestore so for acceccing firestore in all pages we use db , 
  export default (db);
