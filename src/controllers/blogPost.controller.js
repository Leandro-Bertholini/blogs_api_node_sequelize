const { postService } = require('../services');

// const insertPost = async (req, res) => {
//   const { id } = req.user;
//   const { title, content, categoryIds} = req.body;

//   const response = await postService.insertPost(id, { title, content, categoryIds});
// };

const getAllPost = async (req, res) => {
  const { type, message } = await postService.getAllPost();
  return res.status(type).json(message);
};

const getPostById = async (req, res) => {
  const { type, message } = await postService.getPostById(req.params);
  return res.status(type).json(message);
};

module.exports = {
  getAllPost,
  getPostById,
};