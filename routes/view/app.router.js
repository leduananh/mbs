'use strict';

import express from 'express';
import { toIndexPage,getProductDetailPage,getindexPage,addProductPage, cartDetailPage} from '../../controller/app.controller.js';

export const AppRouter = express.Router();

AppRouter.get('/', toIndexPage);

AppRouter.get('/index', getindexPage);

AppRouter.get('/detail', getProductDetailPage);

AppRouter.get('/addProducts', addProductPage);

AppRouter.get('/cartDetails', cartDetailPage);


