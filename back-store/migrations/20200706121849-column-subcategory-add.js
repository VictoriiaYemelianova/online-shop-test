'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Categories',
      'subcategory',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Categories', 'subcategory');
  }
};
