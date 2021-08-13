'use strict';

const firebaseApp = require('../db');
const User = require('../models/User');

const firestore = firebaseApp.firestore();

class UserControllerClass {
  async addUser(req, res, next) {
    try {
      const data = req.body;
      await firestore.collection('users').doc().set(data);
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

module.exports = UserController