const firebase = require('firebase');
const config = require('./config');
const firebaseApp = firebase.initializeApp(config.firebaseConfig);

module.exports = firebaseApp;
