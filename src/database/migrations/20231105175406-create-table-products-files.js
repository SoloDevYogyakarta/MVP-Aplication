'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'FILES',
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
        originalname: {
          type: Sequelize.DataTypes.STRING(75),
          allowNull: true,
        },
        filename: {
          type: Sequelize.DataTypes.STRING(45),
          allowNull: true,
        },
        filepath: {
          type: Sequelize.DataTypes.STRING(45),
          allowNull: true,
        },
        type: {
          type: Sequelize.DataTypes.STRING(20),
          allowNull: true,
        },
        desc: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        browse: {
          type: Sequelize.DataTypes.STRING(75),
          allowNull: true,
        },
        order_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'FILES',
      schema: 'PRODUCTS',
    });
  },
};
