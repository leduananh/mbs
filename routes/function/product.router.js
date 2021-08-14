'use strict';

import express from 'express';

import { getAlbums, addProduct,getProducts } from '../../controller/product.controller.js';

export const ProductRouter = express.Router();

ProductRouter.get('/albums', getAlbums);

ProductRouter.post('/product', addProduct);

ProductRouter.get('/getProducts', getProducts);