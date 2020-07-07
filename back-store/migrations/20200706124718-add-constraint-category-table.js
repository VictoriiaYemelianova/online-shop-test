'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Categories', ['subcategory'], {
      type: 'foreign key',
      name: 'custom_fkey_subcategory',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Categories', 'custom_fkey_subcategory')
  }
};
