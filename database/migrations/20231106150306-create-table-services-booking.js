'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'BOOKING',
        schema: 'SERVICES',
      },
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        title: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        desc: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        },
        date: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        time: {
          type: Sequelize.DataTypes.STRING,
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
      tableName: 'BOOKING',
      schema: 'SERVICES',
    });
  },
};
