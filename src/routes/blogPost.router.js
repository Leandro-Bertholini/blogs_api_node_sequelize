const express = require('express');

const { postController } = require('../controllers');
const { authenticateToken } = require('../utils/JWT');

const route = express.Router();

route.get('/', authenticateToken, postController.getAllPost);

module.exports = route;