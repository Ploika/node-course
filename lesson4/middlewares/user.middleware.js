const userRolesEnum = require('../constans/user-roles.enum');
const { User } = require('../dataBase');
const { errorMessages: { RECORD_NOT_FOUND, WRONG_EMAIL }, ErrorHandler } = require('../errors');
const { responseCodesEnum: { NOT_FOUND, BAD_REQUEST } } = require('../constans');

module.exports = {
  checkIsUserPresent: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const userById = await User.findById(userId);

      if (!userById) {
        throw new ErrorHandler(
          NOT_FOUND,
          RECORD_NOT_FOUND.message,
          RECORD_NOT_FOUND.code
        );
      }

      req.user = userById;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsUserEmailExist: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userEmail = await User.findOne(email);

      if (userEmail) {
        throw new ErrorHandler(
          BAD_REQUEST,
          WRONG_EMAIL.message,
          WRONG_EMAIL.code
        );
      }
      req.user = userEmail;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsAdminMiddleware: (req, res, next) => {
    try {
      const { role } = req.user;
      if (role !== userRolesEnum.ADMIN) {
        throw new Error('not admin');
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
