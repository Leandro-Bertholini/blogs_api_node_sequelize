/**
 * 
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize').dataTypes} Datatypes 
 */
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {

    postId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
  },
  categoryId: { 
      type: DataTypes.INTEGER, 
      allowNull: false ,
  },
},
{
  underscored: true,
  tableName: 'posts_categories',
  timestamps: false
});

  PostCategory.associate = ({ BlogPost, Category }) => {

    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
    });

    Category.belongsToMany(BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId',
    });
  };

  return PostCategory;
}