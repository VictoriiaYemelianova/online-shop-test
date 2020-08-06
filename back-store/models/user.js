'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    pass: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Selectedlist, {
      foreignKey: 'userId',
      allowNull: false
    })
  };
  return User;
};