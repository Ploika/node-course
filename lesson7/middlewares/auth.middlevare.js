const ErrorHandler = require('../errors/ErrorHandler');
const { User, OAuth } = require('../dataBase');
const { passwordHasher, authHelper } = require('../helpers');
const { constants } = require('../constans');

module.exports = {
  checkUserToLogin: async (req, res, next) => {
    try {
      const { password, email } = req.body;

      const userByEmail = await User.findOne({ email }).select('+password');

      if (!userByEmail) {
        throw new Error('Bad');
      }
      await passwordHasher.compare(userByEmail.password, password);

      req.user = userByEmail;
    } catch (e) {
      next(e);
    }
  },
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);
      if (!token) {
        throw new ErrorHandler(401, 'No token');
      }
      await authHelper.verifyToken(token);

      const tokenObject = await OAuth.findOne({ accessToken: token });
      if (!tokenObject) {
        throw new ErrorHandler(401, 'Wrong token');
      }
      req.user = tokenObject.user;
      next();
    } catch (e) {
      next(e);
    }
  }
};
