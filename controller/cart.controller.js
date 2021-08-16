'use strict';

import { CartService } from '../service/cart.service.js';
import { HTTP_STATUS } from '../Utilities/http/status.utilities.js';

const service = new CartService();

export const getCart = async (req, res, next) => {
  try {
    const data = await service.getCart({ sessionID: 'le duan anh' });

    if (data.isError()) {
      defaultErrorHandler(res, data.getMsg());
      return;
    }

    res.status(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.CODE).send(data.getData());
  } catch (error) {
    defaultErrorHandler(res, error.message);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const {productId} = req.body;
    const amount = await service.addToCart('le duan anh',productId);

    if (amount === -1) return defaultErrorHandler(res, 'error');

    res.status(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.CODE).json({amount: amount});
  } catch (error) {
    defaultErrorHandler(res, error.message);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const {productId} = req.body;

    const docRef = 'le duan anh';
    
    const data = await service.removeCartItem(docRef,productId)

    if(data === null) return defaultErrorHandler(res,"không xóa được rồi chú");

    const cart = data;

    res.status(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.CODE).json({cartResponde: cart});
  } catch (error) {
    defaultErrorHandler(res, error.message);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const docRef = 'le duan anh';
    
    const isClear = await service.clearCart(docRef)

    res.status(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.CODE).json({isClear});
  } catch (error) {
    defaultErrorHandler(res, error.message);
  }
};

const defaultErrorHandler = (response, errorMsg) => {
  response
    .status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE)
    .send(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.MSG(errorMsg));
};
