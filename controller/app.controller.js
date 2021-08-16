'use strict';

import { HTTP_STATUS } from '../Utilities/http/status.utilities.js';
import { ProductService } from '../service/product.service.js';

let service = new ProductService();
export const toIndexPage = async (req, res, next) => {
  res.redirect('/index');
  next();
};

export const getindexPage = async (req, res, next) => {
  try {
    let data = await service.getProducts();
    let session = req.session;
    session.save();
    let products = data.isError() ? [] : data.getData();

    res.render('index', { products: products, amount: req.amount });
  } catch (error) {
    res.render('505');
  }
};

export const getProductDetailPage = async (req, res, next) => {
  try {
    const { id } = req.query;
    const product = await service.getProductByName(id);
    if (product.isError()) res.render('505');
    res.render('product_detail_page.ejs', { product: product.getData(), amount: req.amount });
  } catch (error) {
    res.render('505');
  }
};

export const addProductPage = async (req, res, next) => {
  try {
    res.render('product_upload_page.ejs', { amount: req.amount });
  } catch (error) {
    res.render('505');
  }
};

const defaultErrorHandler = (response, errorMsg) => {
  response
    .status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE)
    .send(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.MSG(errorMsg));
};
