'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Selectedlists', ['userId'], {
      type: 'foreign key',
      name: 'custom_fkey_selectedlistuser',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => {
      return queryInterface.addConstraint('Selectedlists', ['productId'], {
        type: 'foreign key',
        name: 'custom_fkey_selectedlistproduct',
        references: {
          table: 'Products',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Selectedlists', 'custom_fkey_selectedlistuser')
      .then(() => queryInterface.removeConstraint('Selectedlists', 'custom_fkey_selectedlistproduct'))
  }
};
