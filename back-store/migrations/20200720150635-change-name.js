'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Categories',
      'subcategory',
      'subcategoryId'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn( 'Categories', 'subcategoryId', 'subcategory');
  }
};
