const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const UsersController = require('../controller/userController');
const usersController = new UsersController();

router.post('/signup', usersController.signupUser);
router.post('/login', usersController.loginUser);
router.get('/users', authMiddleware, usersController.getUser);
router.put('/users', authMiddleware, usersController.updateUser);
router.delete('/users', authMiddleware, usersController.deleteUser);

module.exports = router;