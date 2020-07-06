'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Products',
      'idCategory',
      Sequelize.INTEGER
    ).then(() => {
      return queryInterface.addConstraint('Products', ['idCategory'], {
        type: 'foreign key',
        name: 'custom_fkey_product',
        references: { //Required field
          table: 'Categories',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Products',
      'idCategory',
      Sequelize.STRING
    ).then(() => queryInterface.removeConstraint('Products', 'custom_fkey_product'))
  }
};
