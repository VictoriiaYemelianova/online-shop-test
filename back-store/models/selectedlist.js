'use strict';
module.exports = (sequelize, DataTypes) => {
  const Selectedlist = sequelize.define('Selectedlist', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  Selectedlist.associate = function(model) {
    Selectedlist.belongsTo(model.User, {
      foreignKey: 'userId',
      allowNull: false
    }),

    Selectedlist.belongsTo(model.Product, {
      foreignKey: 'productId',
      allowNull: false
    })
  };
  return Selectedlist;
};