const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const insertUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  const token = generateToken(newUser.id, newUser.email);
  return { token };
};
module.exports = {
  insertUser,
};