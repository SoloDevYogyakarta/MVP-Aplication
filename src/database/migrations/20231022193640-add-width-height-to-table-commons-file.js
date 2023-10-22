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
          'width',
          {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 0,
          },
          { transaction },
        ),
        queryInterface.addColumn(
          {
            tableName: 'FILE',
            schema: 'COMMONS',
          },
          'height',
          {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 0,
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
          'width',
          { transaction },
        ),
        queryInterface.removeColumn(
          {
            tableName: 'FILE',
            schema: 'COMMONS',
          },
          'height',
          { transaction },
        ),
      ]);
    });
  },
};
