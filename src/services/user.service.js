const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const insertUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  const token = generateToken(newUser.id, newUser.email);
  return { token };
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  if (!allUsers) return { type: 500, message: null };

  return { type: 200, message: allUsers };
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  // console.log(user)
  if (!user) return { type: 404, message: 'User does not exist' };

  return { type: 200, message: user };
};

module.exports = {
  insertUser,
  getAllUsers,
  getById,
};