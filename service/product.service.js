import { ProductDao } from '../dao/product.dao.js';
import { FireBaseHelper } from '../Utilities/firebase/firebase.utilities.js';
export class ProductService {
  #dao;
  #productImageRoot;
  constructor() {
    this.#dao = new ProductDao();
    this.#productImageRoot = 'products';
    this.firebaseHelper = new FireBaseHelper();
  }

  async getAlbums() {
    try {
      let data = await this.#dao.getAlbums();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getProducts() {
    try {
      let data = await this.#dao.getProducts();
      return data;
    } catch (error) {
      return error;
    }
  }

  async addProduct(product) {
    try {
      let data = await this.#dao.addProduct(product);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getProductByName(productName) {
    try {
      let data = await this.#dao.getProductByName(productName);
      return data;
    } catch (error) {
      return error;
    }
  }

  async uploadImage(path, file) {
    try {
      let data = await this.firebaseHelper.uploadImage(`${this.#productImageRoot}/${path}`, file);
      return data;
    } catch (error) {
      return null;
    }
  }
}
