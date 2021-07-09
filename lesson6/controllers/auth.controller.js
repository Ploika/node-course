module.exports = {
  logIn: (req, res, next) => {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  }
};
