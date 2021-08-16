'use strict';

import express from 'express';
import session from 'express-session';
import cors from 'cors';

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); 

const upload = require('express-fileupload')

import mysql from 'mysql';

import MySQLStoreFunction from 'express-mysql-session';

import { dirname } from 'path';

import { fileURLToPath } from 'url';

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
app.use(express.urlencoded({ extended: true ,type: 'application/x-www-form-urlencoded'}))
app.use(upload())
// app.use(bodyParser.urlencoded({ extended: true }))
// var options = {
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'session_test',
// };

var options = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'session_test',
  port:3306,
  schema: {
    tableName: 'my_session',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires_column_name',
      data: 'data_column_name',
    },
  },
};

const MySQLStore = MySQLStoreFunction(session);

var connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port:3306,
  password: '',
  database: 'session_test',
  connectionLimit: 2,
});


// var connection = mysql.createConnection(options);

var sessionStore = new MySQLStore(
  options,connectionPool
  // {
  //   createDatabaseTable: true,
  //   endConnectionOnClose: true,
  //   charset: 'utf8mb4_bin',
  //   // schema: {
  //   //   tableName: 'sessions',
  //   //   columnNames: {
  //   //     session_id: 'session_id',
  //   //     expires: 'expires',
  //   //     data: 'data',
  //   //   },
  //   // },
  //   clearExpired: true,
  //   expiration: 86400000,
  // },
  // connection
);

app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: false,
      maxAge: 36000000,
      httpOnly: false,
    },
  })
);

app.get("/test", function(req, res, next){
  console.log(req.session);
console.log(req.sessionID, req.session.name);
 if(!req.session.name){
     console.log("Not set.");
     req.session.name = "vikas kumar";
 } else {
     console.log("Already set");
     console.log(req.session.name);
 }
 res.end();
});

// app.use((req, res, next) => {
//   req.session.init = 'init';
//   next();
// });
