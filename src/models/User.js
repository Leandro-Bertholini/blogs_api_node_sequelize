/**
 * 
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize').dataTypes} Datatypes 
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'blogPosts'
    });
  }

  return User;
}