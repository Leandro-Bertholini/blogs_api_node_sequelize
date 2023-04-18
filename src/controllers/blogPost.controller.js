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
  const { id } = req.params;
  const { type, message } = await postService.getPostById(id);
  return res.status(type).json(message);
};

const updatePostById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userObj = req.user; // retorna o objeto decodificado

  const { type, message } = await postService.updatePostById(id, userObj.id, { title, content });
  res.status(type).json(message);
};

module.exports = {
  getAllPost,
  getPostById,
  updatePostById,
};