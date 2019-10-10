import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import Rebase from 're-base'
import env from 'react-native-config';

const conf = {
  apikey:process.env.REACT_API_API_KEY
};
console.log(conf)
console.log(env.authDomain)

const config = {
    apiKey: "AIzaSyBuTBItB327F5qzynf3Wd0gY7W4RqGs3Ac",
    authDomain: "appreact-native.firebaseapp.com",
    databaseURL: "https://appreact-native.firebaseio.com",
    projectId: "appreact-native",
    storageBucket: "",
    messagingSenderId: "1026877898929",
    appId: "1:1026877898929:web:efadd7448ba9eb9ca4a290",
    measurementId: "G-V35DMWYM17"
};

class Firebase {

  constructor() {
    app.initializeApp(config);
    this.serverValue = app.database.ServerValue;
    this.fieldValue = app.firestore.FieldValue;
    this.auth = app.auth();
    this.db = app.database()
    this.base = Rebase.createClass(app.database())
    //this.db = app.firestore();
    // this.googleProvider = new app.auth.GoogleAuthProvider();
    // this.facebookProvider = new app.auth.FacebookAuthProvider();
    // this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  

  // *** Auth Config ***
  AuthStateChanged = (callBack) => this.auth.onAuthStateChanged(callBack)
  doSignOut = () => this.auth.signOut();

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>  this.auth.signInWithEmailAndPassword(email, password);

 // *** Real time DataBase ***
 firebaseSyncState = (path,state) => this.base.syncState(path,state)
 removeBindingSyncState = (theRef) =>  this.base.removeBinding(theRef)
 getDataBase = () =>  this.db


//   doSignInWithGoogle = () =>
//     this.auth.signInWithPopup(this.googleProvider);

//   doSignInWithFacebook = () =>
//     this.auth.signInWithPopup(this.facebookProvider);

//   doSignInWithTwitter = () =>
//     this.auth.signInWithPopup(this.twitterProvider);


//   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

//   doPasswordUpdate = password =>
//     this.auth.currentUser.updatePassword(password);


//   // *** User API ***
//   user = uid => this.db.doc(`users/${uid}`);
//   users = () => this.db.collection('users');

//   // *** Message API ***
//   message = uid => this.db.doc(`messages/${uid}`);
//   messages = () => this.db.collection('messages');

//   // *** Message API ***
//   computers = () => this.db.collection('computers');

}

export default Firebase;
