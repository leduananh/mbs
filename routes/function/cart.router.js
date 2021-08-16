'use strict';

import express from 'express';

import { getCart,addToCart } from '../../controller/cart.controller.js';

export const CartRouter = express.Router();

CartRouter.get('/getCart', getCart);

CartRouter.post('/addToCart', addToCart);
