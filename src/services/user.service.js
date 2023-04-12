const { User } = require('../models');
const { generateToken } = require('../utils/JWT.js');

const insertUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  const token = generateToken(newUser.id, newUser.email);
  return { token };
};