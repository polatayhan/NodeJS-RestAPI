const express = require('express');
const UserController = require("../controllers/user");
const checkAuth = require("../../../middlewares/checkAuth");
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/signup', UserController.signupUser);
router.post('/login', UserController.loginUser);
router.get('/:userId', checkAuth, UserController.getUserById);
router.patch('/:userId', checkAuth, UserController.patchUserById);
router.delete('/:userId', checkAuth, UserController.deleteUserById);

module.exports = router;