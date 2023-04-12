const { Category } = require('../models');

const insertCategory = async ({ name }) => {
  const insertedCategory = await Category.create(name);
  return { type: 201, message: insertedCategory };
};

module.exports = {
  insertCategory,
};