'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'ORDER',
        schema: 'PRODUCTS',
      },
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.STRING(115),
          allowNull: false,
        },
        desc: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'ORDER',
      schema: 'PRODUCTS',
    });
  },
};
