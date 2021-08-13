const User = require('../User');

const userHandler = ({ uid, email }) => {
  return new Promise((resole, reject) => {
    if (uid === undefined || email === undefined || uid === '' || email === '')
      reject('empty object');

    resole(User(uid, email));
  });
};
module.exports = userHandler;
