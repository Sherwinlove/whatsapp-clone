import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAcpJ0PLCt0DhwpJzOxbFcBeV3XRgO8vt0",
  authDomain: "whatsapp-clone-37573.firebaseapp.com",
  projectId: "whatsapp-clone-37573",
  storageBucket: "whatsapp-clone-37573.appspot.com",
  messagingSenderId: "386250939761",
  appId: "1:386250939761:web:733878216ad124bf67aad0",
  measurementId: "G-LTL0JQW903"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;