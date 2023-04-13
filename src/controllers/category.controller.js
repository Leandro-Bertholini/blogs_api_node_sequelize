const { categoryService } = require('../services');

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoryService.insertCategory(name);
  return res.status(type).json(message);
};

const getAllCategories = async (_req, res) => {
  const { type, message } = await categoryService.getAllCategories();
  return res.status(type).json(message);
};

module.exports = {
  insertCategory,
  getAllCategories,
};