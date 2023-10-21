'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          {
            tableName: 'HISTORY',
            schema: 'PRODUCTS',
          },
          'product_id',
          {
            type: Sequelize.DataTypes.STRING(22),
            allowNull: false,
          },
          { transaction },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.removeColumn(
          {
            tableName: 'HISTORY',
            schema: 'PRODUCTS',
          },
          'product_id',
          { transaction },
        ),
      ]);
    });
  },
};
