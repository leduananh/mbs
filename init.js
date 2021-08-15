'use strict';

import express from 'express';
import session from 'express-session';
import cors from 'cors';

import { dirname } from 'path';

import { fileURLToPath } from 'url';

import connect from 'connect-mongodb-session';

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/static', express.static(__dirname + '/resource/public'));

app.set('views', __dirname + '/resource/pages');

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'secret-key',
  })
);

app.use(express.json());
app.use(cors());

// const store = new connect(session)(
//     {
//       uri: 'mongodb://bad.host:27000/connect_mongodb_session_test?connectTimeoutMS=10',
//       databaseName: 'connect_mongodb_session_test',
//       collection: 'mySessions'
//     },
//     function(error) {
//       // Should have gotten an error
//     })

  
//   store.on('error', function(error) {
//     // Also get an error here
//   });

app.use(
  session({
    cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 7, 
      maxAge: 5000,// 1 week
    },
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
  })
);
