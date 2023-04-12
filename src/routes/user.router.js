const express = require('express');

const route = express.Router();

route.post('/', userController);

module.exports = route;