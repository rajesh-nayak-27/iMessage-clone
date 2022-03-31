import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBHfauktedHk4SZf4Lme0oIxGSTwy6KDnM",
    authDomain: "imessage-clone-6bfae.firebaseapp.com",
    projectId: "imessage-clone-6bfae",
    storageBucket: "imessage-clone-6bfae.appspot.com",
    messagingSenderId: "92398773059",
    appId: "1:92398773059:web:e38bb1cf2d73bd6d2985f6",
    measurementId: "G-GZZFJE4BB3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;