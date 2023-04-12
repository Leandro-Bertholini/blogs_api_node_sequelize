const { userService } = require('../services');

const insertUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUserToken = await userService.insertUser(displayName, email, password, image);
  return res.status(201).json(newUserToken);
};

module.exports = {
  insertUser,
};