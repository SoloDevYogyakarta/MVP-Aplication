'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          {
            tableName: 'VARIANT',
            schema: 'PRODUCTS',
          },
          'price',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
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
            tableName: 'VARIANT',
            schema: 'PRODUCTS',
          },
          'price',
          { transaction },
        ),
      ]);
    });
  },
};
