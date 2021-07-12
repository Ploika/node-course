const router = require('express').Router();
const { authController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.post('/login', userMiddleware.getUserbyDynamicParam('email'), authController.logIn);
router.post('/logout', authMiddleware.checkAccessToken, authController.logOut);
router.post('/refresh', authController.refresh);

module.exports = router;
