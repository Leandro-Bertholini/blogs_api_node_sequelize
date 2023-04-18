const express = require('express');

const { postController } = require('../controllers');
const { authenticateToken } = require('../utils/JWT');
const { postUpdateFields } = require('../middlewares/postUpdateFields');

const route = express.Router();

route.get('/', authenticateToken, postController.getAllPost);
route.get('/:id', authenticateToken, postController.getPostById);
route.put('/:id', authenticateToken, postUpdateFields, postController.updatePostById);

module.exports = route;