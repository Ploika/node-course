const { passwordHasher, authHelper } = require('../helpers');
const { OAuth } = require('../dataBase');
const { constants } = require('../constans');

module.exports = {
  logIn: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error('Wrong email or password');
      }

      const { password: hashPassword, _id } = req.user;
      const { password } = req.body;

      await passwordHasher.compare(hashPassword, password);

      const tokenPair = authHelper.generateTokenPair();

      await OAuth.create({
        ...tokenPair,
        user: _id
      });

      res.json({
        ...tokenPair,
        user: req.user // todo user normalizator
      });
    } catch (e) {
      next(e);
    }
  },
  logOut: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);
      await OAuth.remove({ accessToken: token });
      res.status(204).json('Success');
    } catch (e) {
      next(e);
    }
  },
  refresh: (req, res, next) => {
    try {
      const { body } = req;
      res.json(body);
    } catch (e) {
      next(e);
    }
  }
};
