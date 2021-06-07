import * as firebase from 'firebase'
import 'firebase/firestore'
import "firebase/firebase-storage"

 var firebaseConfig = {
    apiKey: "AIzaSyC4YKwo05Pe6XgVVzrJMB3MtdhqNzg12nk",
    authDomain: "projectx-98867.firebaseapp.com",
    databaseURL: "https://projectx-98867.firebaseio.com",
    projectId: "projectx-98867",
    storageBucket: "projectx-98867.appspot.com",
    messagingSenderId: "802878166500",
    appId: "1:802878166500:web:9d6ec3f96fc3fad896e3f1",
    measurementId: "G-BDK7LNQPFF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
firebase.firestore();  
  
  export default firebase



