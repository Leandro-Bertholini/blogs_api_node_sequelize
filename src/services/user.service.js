const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const insertUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  const token = generateToken(newUser.id, newUser.email);
  return { token };
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] }
  });

  if (!allUsers) return { type: 500, message: null};

  return { type: 200, message: allUsers};
};

module.exports = {
  insertUser,
  getAllUsers,
};