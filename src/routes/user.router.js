const express = require('express');

const { userController } = require('../controllers');

const route = express.Router();

route.post('/', userController.insertUser);

module.exports = route;