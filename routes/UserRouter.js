'use strict';

import express from 'express';
import UserController from '../controller/UserController.js';

const UserRouter = express.Router();
const controller = UserController();

UserRouter.post('/user', controller.addUser);

UserRouter.get('/getAllUser', controller.getAllUser);
export default UserRouter;
