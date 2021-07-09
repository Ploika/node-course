const { User } = require('../dataBase');
const { passwordHasher } = require('../helpers');

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
  }
};
