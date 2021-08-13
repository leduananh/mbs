'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

app.listen();
app.use(express.json());
app.use(cors());

module.exports = app;