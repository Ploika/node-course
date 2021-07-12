const { User } = require('../dataBase');

module.exports = {
  getUserByParamsInternal(id) {
    return User.findById(id).select('+password + token -email');
  }
};
