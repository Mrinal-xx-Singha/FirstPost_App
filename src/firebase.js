import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/storage';



  const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyAbm40Egp9GasfV0R8eA1skQmvg1exx1Ik",
  authDomain: "firstpost-react.firebaseapp.com",
  projectId: "firstpost-react",
  storageBucket: "firstpost-react.appspot.com",
  messagingSenderId: "775407920632",
  appId: "1:775407920632:web:5102aa8e59033246f3620d",
  measurementId: "G-2ZEW4TJ76G"

  });
  // db firestore 
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage };

// export default db;