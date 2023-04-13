const { Category } = require('../models');

const insertCategory = async (name) => {
  const insertedCategory = await Category.create({ name });
  return { type: 201, message: insertedCategory };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { type: 200, message: categories };
};

module.exports = {
  insertCategory,
  getAllCategories,
};