'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.removeColumn(
          {
            tableName: 'HISTORY',
            schema: 'PRODUCTS',
          },
          'user_id',
          { transaction },
        ),
        queryInterface.addColumn(
          {
            tableName: 'BASIC',
            schema: 'PRODUCTS',
          },
          'user_id',
          { type: Sequelize.DataTypes.STRING(22), allowNull: true },
          { transaction },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
