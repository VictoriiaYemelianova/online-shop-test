'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    subcategoryId: DataTypes.INTEGER
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'idCategory',
      constraints: false
    })

    Category.hasMany(models.Category, {
      foreignKey: 'subcategoryId',
      constraints: false
    })
  };
  return Category;
};