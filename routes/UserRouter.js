'use strict';

const express = require('express');
const UserController = require('../controller/UserController');

const UserRouter = express.Router();
const controller = UserController();

UserRouter.post('/user', controller.addUser);

UserRouter.get('/getAllUser', controller.getAllUser);

module.exports = {
  routes: UserRouter,
};
