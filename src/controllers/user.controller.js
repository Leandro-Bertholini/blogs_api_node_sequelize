
const insertUser = async (req, res) => {
  const newUserToken = await userService.insertUser(req.body);
  return res.status(201).json(newUserToken);
};

module.exports = {
  insertUser,
};