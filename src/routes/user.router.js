const express = require('express');

const { userController } = require('../controllers');
const {
  validateName,
  validateEmail,
  validatePassword,
  checkExistingEmail,
} = require('../middlewares/userPost.middlewares');
const { authenticateToken } = require('../utils/JWT');

const route = express.Router();

route.post(
  '/',
  validateName,
  validateEmail,
  validatePassword,
  checkExistingEmail,
  userController.insertUser,
  );

route.get('/', authenticateToken, userController.getAllUsers);

module.exports = route;