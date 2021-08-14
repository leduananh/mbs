import firebase  from 'firebase';
import config  from './config.js';

export const firebaseApp = firebase.initializeApp(config.firebaseConfig);
