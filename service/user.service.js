import { UserDao } from '../dao/user.dao.js';

export class UserService {
  #dao;
  constructor() {
    this.#dao = new UserDao();
  }

  async getAllUser() {
    try {
      let data = await this.#dao.getAllUser();
      return data;
    } catch (error) {
      return error;
    }
  }

  async addUser(user) {
    try {
      let data = await this.#dao.addUser(user);
      return data;
    } catch (error) {
      return error;
    }
  }
}
