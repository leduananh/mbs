'use strict';

import firebaseApp from '../db.js';
import User from '../models/User.js';
import userHandler from '../models/modelsHandler/UserHandler.js';

const firestore = firebaseApp.firestore();

class UserControllerClass {
  async addUser(req, res, next) {
    try {
      let user = await userHandler(req.body);
      await firestore.collection('users').doc().set(user);
      res.status(200).send('save ok');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getAllUser(req, res, next) {
    try {
      let users = await firestore.collection('users');
      let data = await users.get();
      if (data.empty) res.status(400).send('');
      res.status(200).json(data.docs.map((doc) => doc.data()));
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}
const UserController = () => new UserControllerClass();

export default UserController;
