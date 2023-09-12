const { postService } = require('../services');

const insertPost = async (req, res) => {
  const userData = req.body;
  const userToken = req.headers.authorization;
   const { type, message } = await postService.addNewPost(userData, userToken);

   return res.status(type).json(message);
};

const getAllPost = async (_req, res) => {
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
  return res.status(type).json(message);
};

const deletPostById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { status, message } = await postService.deletPostById(+id, authorization);

  return res.status(status).json(message);
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  const { status, message } = await postService.searchPost(q);
  return res.status(status).json(message);
  // http://localhost:PORT/post/search?q=vamos
};

module.exports = {
  getAllPost,
  getPostById,
  updatePostById,
  insertPost,
  deletPostById,
  searchPost,
};