import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions'

const firebaseConfig = {
    apiKey: "AIzaSyAQ0ApMpmRux1NQB4ha4FVNbMHqy181vOU",
    authDomain: "movies-67091.firebaseapp.com",
    projectId: "movies-67091",
    storageBucket: "movies-67091.appspot.com",
    messagingSenderId: "1058716771867",
    appId: "1:1058716771867:web:d5d8cb3f6adecc47403abe"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore;




export default firebase;
