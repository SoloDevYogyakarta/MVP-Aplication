'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          {
            tableName: 'USER',
            schema: 'AUTHENTICATE',
          },
          'file_id',
          {
            type: Sequelize.DataTypes.STRING(22),
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
            tableName: 'USER',
            schema: 'AUTHENTICATE',
          },
          'file_id',
          { transaction },
        ),
      ]);
    });
  },
};
