import { HTTP_STATUS } from '../../Utilities/http/status.utilities.js';
import { Errors } from '../../models/error/error.validation.model.js';

export const validation = (req, res, next) => {
  const { uid, email, role } = req.body;
  let error = new Errors();
  try {
    if (uid === undefined || uid === '')
      error.push({ pos: 'uid', msg: 'uid is empty or undefined' });

    if (email === undefined || email === '')
      error.push({ pos: 'email', msg: 'email is empty or undefined' });

    if (role === undefined || role === '')
      error.push({ pos: 'role', msg: 'role is empty or undefined' });

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
