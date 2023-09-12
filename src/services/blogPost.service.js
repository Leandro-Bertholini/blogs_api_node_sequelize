const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { BlogPost, Category, User } = require('../models');

const { Op } = Sequelize;

const messageInException = { message: 'one or more "categoryIds" not found' };

const verifyCategories = async (categoryIds) => {
  const allCategories = await Category.findAll({
    attributes: ['id'],
    raw: true,
  });
  const onlyIds = allCategories.map((cat) => cat.id);
  const isId = categoryIds.every((cat) => onlyIds.includes(cat));
  return isId.toString();
};

const insertPost = async ({ title, content, categoryIds }, userToken) => {
  const isFalse = await verifyCategories(categoryIds);
  if (isFalse === 'false') return { status: 400, messageInException };
  const decode = jwt.decode(userToken);
  const user = await User.findOne({ where: { email: decode.email } });
  const post = await BlogPost.create({
    title,
    content,
    userId: user.dataValues.id,
  });
  categoryIds.map((cat) => Category.create({ postId: post.id, categoryId: cat }));
  return { type: 201, message: post };
};

const getAllPost = async () => {
  const allPosts = await BlogPost.findAll({
    include: [{ 
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
     }, {
      model: Category,
      as: 'categories',
     }],
  });
  return { type: 200, message: allPosts };
};

const getPostById = async (id) => {
  const targetPost = await BlogPost.findOne(
    {
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    },
  );
  if (!targetPost) return { type: 404, message: { message: 'Post does not exist' } };

  return { type: 200, message: targetPost };
};

const updatePostById = async (id, userId, { title, content }) => {
  const { dataValues } = await User.findOne({ where: { id: userId } });                       
  
  const { message } = await getPostById(id);                                  

  if (message.dataValues.userId !== dataValues.id) {                             
    return { type: 401, message: { message: 'Unauthorized user' } };
  }

  await BlogPost.update({ title, content }, { where: { id } });

  const updatedPost = await getPostById(id);

  return { type: 200, message: updatedPost.message };
};

const deletPostById = async (postId, userToken) => {
  const decode = jwt.decode(userToken);// Método do próprio jwt para decodificar
  const searchUserId = await User.findOne({ where: { email: decode.email } });
  const userId = searchUserId.id;
  const blogPostById = await BlogPost.findByPk(postId);
  if (!blogPostById) {
    return { status: 404, message: { message: 'Post does not exist' } };
  }
  if (blogPostById.userId !== userId) {
    return { status: 401, message: { message: 'Unauthorized user' } };
  }
  await BlogPost.destroy({
    where: { id: postId },
  });
  return { status: 204, message: '' };
};

const searchPost = async (search) => {
  const postsReturn = await BlogPost.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: `%${search}%` },
        content: { [Op.like]: `%${search}%` },
      },
    },
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return { status: 200, message: postsReturn };
};

module.exports = {
  getAllPost,
  getPostById,
  updatePostById,
  insertPost,
  deletPostById,
  searchPost,
  
};