import { HTTP_STATUS } from '../../Utilities/http/status.utilities.js';
import { Errors } from '../../models/error/error.validation.model.js';

export const validation = (req, res, next) => {
  const { productName } = req.body;
  let error = new Errors();
  try {
    if (productName === undefined || productName === '')
      error.push({ pos: 'productName', msg: 'product name is empty or undefined' });

    if (error.isError()) {
      res
        .status(HTTP_STATUS.CLIENT_ERROR.UNPROCESSABLE_ENTITY.CODE)
        .send(
          HTTP_STATUS.CLIENT_ERROR.UNPROCESSABLE_ENTITY.MSG(error.toString())
        );
      return;
    }
    next();
  } catch (error) {
    res
      .status(HTTP_STATUS.CLIENT_ERROR.UNPROCESSABLE_ENTITY.CODE)
      .send(HTTP_STATUS.CLIENT_ERROR.UNPROCESSABLE_ENTITY.MSG(error.message));
  }
};
