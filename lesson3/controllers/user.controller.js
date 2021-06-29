const userService = require('../services/user.service');

module.exports = {
  gettAllUsers: (req, res) => {
    const users = userService.findAll();
    res.json(users);
  },
  createUser: (req, res) => {
    userService.insertUser(req.body);

    res.json('success');
  },
  deleteUserById: (req, res) => {
    const { userId } = req.params;

    if (userId > 10) {
      console.log(222);
    }

    res.status(204).json(userId);
  },
  getUserById: (req, res) => {
    const { user } = req;
    res.json(user);
  }

};
