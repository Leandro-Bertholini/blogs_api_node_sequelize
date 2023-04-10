/**
 * 
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize').dataTypes} Datatypes 
 */
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {

    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    tableName: 'post_categories',
    underscored: true,
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