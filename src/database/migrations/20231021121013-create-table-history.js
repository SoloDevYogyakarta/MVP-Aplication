'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'HISTORY',
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
        public_id: {
          type: Sequelize.DataTypes.STRING(22),
          unique: true,
          allowNull: false,
        },
        type: {
          type: Sequelize.DataTypes.STRING(115),
          allowNull: false,
        },
        date: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.DataTypes.STRING(22),
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'HISTORY',
      schema: 'PRODUCTS',
    });
  },
};
