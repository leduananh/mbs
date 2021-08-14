'use strict';

import { HTTP_STATUS } from '../Utilities/http/status.utilities.js';

export const toIndex = async (req, res, next) => {
  res.redirect('/index');
  next();
};

export const getindex = (req, res, next) => {
  res.render('index');
};

const defaultErrorHandler = (response, errorMsg) => {
  response
    .status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE)
    .send(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.MSG(errorMsg));
};
