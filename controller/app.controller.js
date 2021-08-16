'use strict';

import { HTTP_STATUS } from '../Utilities/http/status.utilities.js';
import { ProductService } from '../service/product.service.js';
import { CartService } from '../service/cart.service.js';

const productService = new ProductService();
const cartService = new CartService();

export const toIndexPage = async (req, res, next) => {
  res.redirect('/index');
  next();
};

export const getindexPage = async (req, res, next) => {
  try {
    let data = await productService.getProducts();
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
    const product = await productService.getProductByName(id);
    if (product.isError()) res.render('505');
    res.render('product_detail_page.ejs', {
      product: product.getData(),
      amount: req.amount,
    });
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

export const cartDetailPage = async (req, res, next) => {
  try {
    let docRef = 'le duan anh';
    const data = await cartService.getCart(docRef);
    if (data.isError()) return res.render('505');
    const cart = data.getData();
    
    res.render('cart_detail_page.ejs', {cart:cart});
  } catch (error) {
    res.render('505');
  }
};

const defaultErrorHandler = (response, errorMsg) => {
  response
    .status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE)
    .send(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.MSG(errorMsg));
};
