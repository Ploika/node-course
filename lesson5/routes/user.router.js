const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.gettAllUsers);

router.post('/', userMiddleware.checkUserValidity, userMiddleware.checkIsUserEmailExist, userController.createUser);

router.delete('/:userId', userController.deleteUserById);

router.get('/:userId', userMiddleware.checkIsUserPresent, userController.getUserById);

router.patch('/:userId', userController.updateUserById);

module.exports = router;
