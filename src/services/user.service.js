const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const insertUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  const token = generateToken({ id: newUser.id, email: newUser.email }); 
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

  if (!user) return { type: 404, message: { message: 'User does not exist' } };

  return { type: 200, message: user };
};

const deleteMyUser = async (userToken) => {
  const userTokenDecoded = jwt.decode(userToken);
  const { email } = userTokenDecoded;
  await User.destroy({
    where: { email },
  });
   return { status: 204, message: 'deleted' };
  };

module.exports = {
  insertUser,
  getAllUsers,
  getById,
  deleteMyUser,
};