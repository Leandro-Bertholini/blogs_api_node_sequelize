const express = require('express');

const { categoryController } = require('../controllers');
const { authenticateToken } = require('../utils/JWT');
const { existingName } = require('../middlewares/categoryPost.middlewares');

const route = express.Router();

route.post('/', authenticateToken, existingName, categoryController.insertCategory);

module.exports = route;