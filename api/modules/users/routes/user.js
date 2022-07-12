const express = require('express');
const UserController = require("../controllers/user");
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/signup', UserController.signupUser);
router.post('/login', UserController.loginUser);
router.get('/:userId', UserController.getUserById);
router.patch('/:userId', UserController.patchUserById);
router.delete('/:userId', UserController.deleteUserById);

module.exports = router;