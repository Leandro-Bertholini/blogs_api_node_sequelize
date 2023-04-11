/**
 * 
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize').datatypes} Datatypes 
 */
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {

    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    underscored: true,
    tableName: 'blog_posts',
    timestamps: false,
  });
  

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  }

  return BlogPost;
}