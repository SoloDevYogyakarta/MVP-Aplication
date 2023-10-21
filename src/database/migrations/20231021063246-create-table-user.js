'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'USER',
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
        public_id: {
          type: Sequelize.DataTypes.STRING(22),
          unique: true,
          allowNull: false,
        },
        username: {
          type: Sequelize.DataTypes.STRING(75),
          unique: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.STRING(115),
          unique: true,
          allowNull: true,
        },
        phone_number: {
          type: Sequelize.DataTypes.STRING(22),
          unique: true,
          allowNull: true,
        },
        password: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
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
      tableName: 'USER',
      schema: 'AUTHENTICATE',
    });
  },
};
