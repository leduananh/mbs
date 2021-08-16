'use strict';

import express from 'express';

import { getCart,addToCart, removeCartItem, clearCart} from '../../controller/cart.controller.js';

export const CartRouter = express.Router();

CartRouter.get('/getCart', getCart);

CartRouter.post('/addToCart', addToCart);

CartRouter.post('/removeCartItem', removeCartItem);

CartRouter.get('/clearCart', clearCart);

