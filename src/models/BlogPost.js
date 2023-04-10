/**
 * 
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize').datatypes} Datatypes 
 */
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {

    id: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATA,
    updated: DataTypes.DATA,
  }, {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false
  });
  

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  }

  return BlogPost;
}