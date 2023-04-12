const express = require('express');

const { userController } = require('../controllers');
const {
  validateName,
  validateEmail,
  validatePassword,
  checkExistingEmail,
} = require('../middlewares/userPost.middlewares');

const route = express.Router();

route.post(
  '/',
  validateName,
  validateEmail,
  validatePassword,
  checkExistingEmail,
  userController.insertUser,
  );

module.exports = route;