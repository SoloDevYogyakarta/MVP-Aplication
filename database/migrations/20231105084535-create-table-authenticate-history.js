'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'HISTORY',
        schema: 'AUTHENTICATE',
      },
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          allowNull: false,
        },
        plat_number: {
          type: Sequelize.DataTypes.STRING(22),
          allowNull: false,
        },
        phone_number: {
          type: Sequelize.DataTypes.STRING(22),
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
        },

        address: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'HISTORY',
      schema: 'AUTHENTICATE',
    });
  },
};
