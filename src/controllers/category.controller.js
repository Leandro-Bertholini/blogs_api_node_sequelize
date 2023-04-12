const { categoryService } = require('../services');

const insertCategory = async (req, res) => {
  const { type, message } = await categoryService.insertCategory(req.body);
  return res.status(type).json(message);
};

module.exports = {
  insertCategory,
};