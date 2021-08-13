import User from '../User.js';

const userHandler = ({ uid, email }) => {
  return new Promise((resole, reject) => {
    if (uid === undefined || email === undefined || uid === '' || email === '')
      reject({ message: 'empty object' });
    resole(User(uid, email));
  });
};
export default userHandler;
