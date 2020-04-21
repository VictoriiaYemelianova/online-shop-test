'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'idCategory',
      constraints: false
    })
  };
  return Category;
};