import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyD9Q5iLhsVb0-WnyvyVSAsblQ3wf7J1aFk",
    authDomain: "tunein-2fc6f.firebaseapp.com",
    databaseURL: "https://tunein-2fc6f.firebaseio.com",
    projectId: "tunein-2fc6f",
    storageBucket: "tunein-2fc6f.appspot.com"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

auth.onAuthStateChanged( user => {
    if (user) {
        //db.collection('users').onSnapshot(snapshot => {
            //console.log(snapshot)
        //})
        console.log('user logged in',  user.displayName);
    }
    else {
        console.log('user logged out');
    }
});

export {db, auth, storage};