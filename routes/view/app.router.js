'use strict';

import express from 'express';
import { toIndex, getindex } from '../../controller/app.controller.js';

export const AppRouter = express.Router();

AppRouter.get('/', toIndex);

AppRouter.get('/index', getindex);
