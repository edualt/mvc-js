var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
//ruta de busqueda
router.route('/user/search/').get(userController.searchUserControllerFunc);

router.route('/user/update/:id').put(userController.updateUserControllerFunc);

router.route('/user/delete/:id').delete(userController.deleteUserControllerFunc);

router.route('/user/list').get(userController.listUsersControllerFunc);

module.exports = router;
