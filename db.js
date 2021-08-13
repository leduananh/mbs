import firebase from 'firebase';
import config from './config.js';
const firebaseApp = firebase.initializeApp(config.firebaseConfig);

export default firebaseApp;
