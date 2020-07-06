'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    price: DataTypes.INTEGER,
    idCategory: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'idCategory',
      constraints: false
    })
  };
  return Product;
};