import { HTTP_STATUS } from '../Utilities/http/status.utilities.js';
import { Errors } from '../models/error/error.validation.model.js';
import { CartService } from '../service/cart.service.js';

const service = new CartService();
export const loadSessionCartAmount = async (req, res, next) => {
  try {
    const docRef = 'le duan anh';
    const data = await service.getCart(docRef);
    if (data.isError()) {
      req.amount = 0;
      next();
    }
    const cart = data.getData();
    let amount = service.getCartAmount(cart);
    req.amount = amount;
    next();
  } catch (error) {
    res
      .status(HTTP_STATUS.CLIENT_ERROR.UNPROCESSABLE_ENTITY.CODE)
      .send(HTTP_STATUS.CLIENT_ERROR.UNPROCESSABLE_ENTITY.MSG(error.message));
  }
};
