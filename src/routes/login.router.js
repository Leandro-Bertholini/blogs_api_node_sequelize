const express = require('express');

const { loginController } = require('../controllers');

const route = express.Router();

route.post('/', loginController.AuthorizationToken);

module.exports = route;