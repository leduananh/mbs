'use strict';

import { HTTP_STATUS } from '../Utilities/http/status.utilities.js';
import { ProductService } from '../service/product.service.js';

let service = new ProductService();
export const toIndex = async (req, res, next) => {
  
  if (!req.session.views) {
    req.session.views = 0;
  }
  const views = req.session.views++;
  res.redirect('/index');
  next();
};

export const getindex = async (req, res, next) => {
  try {
    let data = await service.getProducts();

    let products = data.isError() ? [] : data.getData();

    res.render('index', { products: products});
  } catch (error) {
    res.render('505');
  }
};

const defaultErrorHandler = (response, errorMsg) => {
  response
    .status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE)
    .send(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.MSG(errorMsg));
};
