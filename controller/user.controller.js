'use strict';

import { UserService } from '../service/user.service.js';
import { HTTP_STATUS } from '../Utilities/http/status.utilities.js';

let service = new UserService();

export const addUser = async (req, res, next) => {
  try {
    let data = await service.addUser(req.body);

    if (data.isError()) {
      defaultErrorHandler(res, data.getMsg());
      return;
    }

    res
      .status(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.CODE)
      .send(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.MSG());
  } catch (error) {
    defaultErrorHandler(res, error.message);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    let data = await service.getAllUser();

    if (data.isError()) {
      defaultErrorHandler(res, data.getMsg());
      return;
    }
    res.status(HTTP_STATUS.SUCCESSFUL_RESPONSES.OK.CODE).json(data.getData());
  } catch (error) {
    defaultErrorHandler(res, error.message);
  }
};

const defaultErrorHandler = (response, errorMsg) => {
  response
    .status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE)
    .send(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.MSG(errorMsg));
};
