import firebase  from 'firebase';
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const my_json_file = require('./mobile-shop-61e13-firebase-adminsdk-v2jie-d637b49bff.json') // use the require method

import config  from './config.js';
import admin from 'firebase-admin'

export const firebaseApp = firebase.initializeApp(config.firebaseConfig);
