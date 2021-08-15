import { IdGenerator } from '../Utilities/uuid/uuid.utilities.js';

export const Product = ({ id, name, price, stock, path, description }) => {
  return {
    id: id,
    name: name,
    price: price,
    stock: stock,
    description: description === undefined ? '' : description,
    path: path,
    url: null,
  };
};
