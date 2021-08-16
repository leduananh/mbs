import { firebaseApp } from '../db.js';
import { User } from '../models/User.model.js';
import { Errors } from '../models/error/error.dao.model.js';
export class UserDao {
  #collection_name;
  #repository;
  constructor() {
    this.#collection_name = 'users';
    this.#repository = firebaseApp.firestore();
  }

  getAllUser() {
    return new Promise(async (resolve, reject) => {
      try {
        let users = await this.#repository.collection(this.#collection_name);
        let data = await users.get();
        if (data.empty) reject(new Errors(true, null, 'dont have data'));
        data = data.docs.map((doc) => doc.data());
        resolve(new Errors(false, data, ''));
      } catch (error) {
        reject(new Errors(true, data, error.message));
      }
    });
  }

  addUser(user) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.#repository
          .collection(this.#collection_name)
          .doc()
          .set(user);
        resolve(new Errors(false, true, ''));
      } catch (error) {
        reject(new Errors(true, null, error.message));
      }
    });
  }
}
