class UserClass {
  constructor(id, email) {
    this.Uid = id;
    this.email = email;
  }
}
const User = (id, email) => new User(id, email);
module.exports = User;
