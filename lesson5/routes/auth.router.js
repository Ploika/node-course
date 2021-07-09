const router = require('express').Router();
const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.get('/', authMiddleware.checkUserToLogin, authController.logIn);

module.exports = router;
