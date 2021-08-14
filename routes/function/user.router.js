'use strict';

import express from 'express';

import { addUser, getAllUser } from '../../controller/user.controller.js';
import { validation } from '../../middleware/validation/user.validation.middleware.js';

export const UserRouter = express.Router();

UserRouter.post('/user', validation, addUser);

UserRouter.get('/getAllUser', getAllUser);
