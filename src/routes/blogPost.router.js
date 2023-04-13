const express = require('express');

const { postController } = require('../controllers');
const { authenticateToken } = require('../utils/JWT');

const route = express.Router();

route.get('/', authenticateToken, postController.getAllPost);
route.get('/:id', authenticateToken, postController.getPostById);

module.exports = route;