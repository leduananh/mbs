import { CartDao } from '../dao/cart.dao.js';
import { ProductService } from '../service/product.service.js';
export class CartService {
  #dao;
  #productService;

  constructor() {
    this.#dao = new CartDao();
    this.#productService = new ProductService();
  }

  async getCart(docRef) {
    try {
      const data = await this.#dao.getCart(docRef);
      return data;
    } catch (error) {
      return error;
    }
  }

  async addToCart(docRef, productName) {
    try {
      const data = await this.getCart(docRef);

      if (data.isError()) {
        const newCart = new Map();

        const product = await this.#productService.getProductByName(
          productName
        );

        if (product.isError()) return -1;

        newCart.set(productName, { product: product.getData(), amount: 1 });

        await this.#dao.saveCart(docRef, newCart);

        return this.getCartAmount(newCart);
      }
      let a = new Map();
      const cart = data.getData();
      if (cart.has(productName)) {
        const inCartItem = cart.get(productName);
        if (inCartItem) inCartItem.amount += 1;
      } else {
        const product = await this.#productService.getProductByName(
          productName
        );
        if (product.isError()) return -1;

        cart.set(productName, { product: product.getData(), amount: 1 });
      }

      this.#dao.updateCart(docRef, cart);

      return this.getCartAmount(cart);
    } catch (error) {
      return -1;
    }
  }

  async removeCartItem(docRef,productId){
    try {
      const data = await this.getCart(docRef);

      if (data.isError()) return null

      const cart = data.getData();

      cart.delete(productId)

      const error = await this.#dao.updateCart(docRef,cart)

      if(error.isError()) return null;

      return this.#dao.cartStringify(cart);
    } catch (error) {
      return null;
    }
  }

  async clearCart(docRef){
    try {
      const data = await this.#dao.clearCart(docRef)
      if(data.isError()) return false;
      return true
    } catch (error) {
      return false;
    }
  }

  getCartAmount(cart) {
    return Array.from(cart.values())
      .map((incart) => incart.amount)
      .reduce((count, curVal) => count + curVal);
  }
}
