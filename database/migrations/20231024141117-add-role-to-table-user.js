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
          'role',
          {
            type: Sequelize.DataTypes.STRING(10),
            defaultValue: 'mmeber',
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
          'role',
          { transaction },
        ),
      ]);
    });
  },
};
