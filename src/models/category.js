/**
 * 
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize').dataTypes} Datatypes 
 */
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {

    name: DataTypes.STRING
  }, {
    tableName: 'categories',
    underscored: true,
    timestamps: false
  });

  return Category;
}