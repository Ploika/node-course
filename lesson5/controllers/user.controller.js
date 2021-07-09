const { User } = require('../dataBase');
const { responseCodesEnum } = require('../constans');
const { passwordHasher } = require('../helpers');

module.exports = {
  gettAllUsers: async (req, res) => {
    const users = await User.find();

    res.json(users);
  },

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await User.create({ ...req.body, password: hashedPassword });

      res.status(responseCodesEnum.CREATED).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  deleteUserById: async (req, res) => {
    const { userId } = req.params;

    await User.deleteOne(userId);

    res.status(responseCodesEnum.NO_CONTENT).json(userId);
  },

  getUserById: (req, res) => {
    const { user } = req;

    res.json(user);
  },

  updateUserById: async (req, res) => {
    await User.updateOne(req.body);
    res.json('success');
  }

};
