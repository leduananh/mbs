import { Errors } from '../models/error/error.dao.model.js';
import { firebaseApp } from '../db.js';

export class CartDao {
  #collection_name;
  #repository;
  constructor() {
    this.#collection_name = 'carts';
    this.#repository = firebaseApp.firestore();
  }

  saveCart(docRef,cart) {
    return new Promise(async (resolve, reject) => {
      try {
        const cartRef = this.#repository.collection(this.#collection_name).doc(docRef);
    
        await cartRef.set({cart: this.cartStringify(cart)});

         resolve(new Errors(false, true, ''));
      } catch (error) {
        resolve(new Errors(true, null, error.message));
      }
    });
  }
  
  updateCart(docRef,cart){
    return new Promise(async (resolve, reject) => {
      try {
        const cartRef = this.#repository.collection(this.#collection_name).doc(docRef);

        await cartRef.update({cart: this.cartStringify(cart)});

        resolve(new Errors(false, true, ''));

      } catch (error) {
        reject(new Errors(true, null, error.message));
      }
    });
  }

  getCart(docRef) {
    return new Promise(async (resolve, reject) => {
      try {
        const cartRef = await this.#repository.collection(this.#collection_name).doc(docRef);
  
        const doc = await cartRef.get();
  
        if (!doc.exists){
          reject(new Errors(true, null, 'dont have cart'));
          return;
        }

        resolve(new Errors(false, this.toCart(doc.data().cart), ''));
      } catch (error) {
        reject(new Errors(true, null, error.message));
      }
    });
  }

  cartStringify(cart) {
    return JSON.stringify(Array.from(cart.entries()));
  }

  toCart(cartStringify) {
    return new Map(JSON.parse(cartStringify));
  }
}
