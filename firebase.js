import firebase from 'firebase'
// import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD0srqW2_okR9WHTGNtF13r2-GJ00XHk_Y",
    authDomain: "whatsapp-2-4f95f.firebaseapp.com",
    projectId: "whatsapp-2-4f95f",
    storageBucket: "whatsapp-2-4f95f.appspot.com",
    messagingSenderId: "1078987402777",
    appId: "1:1078987402777:web:528a49dec4fb74b8098488"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  // let firestore = firebase.firestore();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider };