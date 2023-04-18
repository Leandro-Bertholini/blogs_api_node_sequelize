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

module.exports = {
  getAllPost,
  getPostById,
  updatePostById,
};