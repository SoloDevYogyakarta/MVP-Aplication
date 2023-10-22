'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'CONNECT',
        schema: 'COMMONS',
      },
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          allowNull: false,
        },
        public_id: {
          type: Sequelize.DataTypes.STRING(22),
          unique: true,
          allowNull: false,
        },
        source_id: {
          type: Sequelize.DataTypes.STRING(22),
          allowNull: false,
        },
        foreign_id: {
          type: Sequelize.DataTypes.STRING(22),
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'CONNECT',
      schema: 'COMMONS',
    });
  },
};
