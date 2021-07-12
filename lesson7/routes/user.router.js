const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { userRolesEnum } = require('../constans');

router.use('/:userId', userMiddleware.getUserbyDynamicParam('userId', 'params', '_id'));

router.get('/', userController.gettAllUsers);

router.post('/', userMiddleware.checkUserValidity, userMiddleware.checkIsUserEmailExist, userController.createUser);

router.delete('/:userId', userMiddleware.checkUserRole([
  userRolesEnum.ADMIN,
  userRolesEnum.MANAGER
]), userController.deleteUserById);

router.get('/:userId', userController.getUserById);

router.patch('/:userId', userController.updateUserById);

router.put('/:userId', userController.updateUser);

module.exports = router;
