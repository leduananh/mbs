import { ProductDao } from '../dao/product.dao.js';

export class ProductService {
  #dao;
  constructor() {
    this.#dao = new ProductDao();
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
}
