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
      attributes: { exclude: ['password'] },
      as: 'user',
     }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] }, 
     }],
    
  });
  return { type: 200, message: allPosts };
};

module.exports = {
  getAllPost,
};