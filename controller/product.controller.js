'use strict';

import { ProductService } from '../service/product.service.js';
import { HTTP_STATUS } from '../Utilities/http/status.utilities.js';

let service = new ProductService();

export const getAlbums = async (req, res, next) => {
  try {
    let data = await service.getAlbums();

    if (data.isError()) {
      defaultErrorHandler(res, data.getMsg());
      return;
    }

    res.status(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.CODE).send(data.getData());
  } catch (error) {
    defaultErrorHandler(res, error.message);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;

    const uploadFileName = req.files.path.name;

    const file = req.files.path.data;

    let productUrl = await service.uploadImage(uploadFileName, file);
    if (productUrl === null || productUrl === undefined)
      return defaultErrorHandler(res, 'cant process upload image');

    newProduct.url = productUrl;
    newProduct.path = uploadFileName;

    let data = await service.addProduct(newProduct);

    if (data.isError()) return defaultErrorHandler(res, data.getMsg());

    res.status(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.CODE).send(data.getData());
  } catch (error) {
    defaultErrorHandler(res, error.message);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    let data = await service.getProducts();

    if (data.isError()) {
      defaultErrorHandler(res, data.getMsg());
      return;
    }

    res.status(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.CODE).send(data.getData());
  } catch (error) {
    defaultErrorHandler(res, error.message);
  }
};

const defaultErrorHandler = (response, errorMsg) => {
  response
    .status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE)
    .send(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.MSG(errorMsg));
};
