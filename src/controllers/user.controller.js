const { userService } = require('../services');

const insertUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUserToken = await userService.insertUser(displayName, email, password, image);
  return res.status(201).json(newUserToken);
};

const getAllUsers = async (_req, res) => {
  const { type, message } = await userService.getAllUsers();
  return res.status(type).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getById(id);
  return  res.status(type).json(message);
};

module.exports = {
  insertUser,
  getAllUsers,
  getById,
};