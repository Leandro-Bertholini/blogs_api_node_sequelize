const { categoryService } = require('../services');

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoryService.insertCategory(name);
  return res.status(type).json(message);
};

module.exports = {
  insertCategory,
};