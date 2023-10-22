'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          {
            tableName: 'FILE',
            schema: 'COMMONS',
          },
          'originalname',
          {
            type: Sequelize.DataTypes.STRING(75),
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
            tableName: 'FILE',
            schema: 'COMMONS',
          },
          'originalname',
          { transaction },
        ),
      ]);
    });
  },
};
