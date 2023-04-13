const { BlogPost, Category, User } = require('../models');

// const insertPost = async (title, content, categoryIds) => {
//   const insertedPost = await blogPost.create(
//     {

//     }
//   )
// };

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

const getPostById = async ({ id }) => {
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

module.exports = {
  getAllPost,
  getPostById,
};