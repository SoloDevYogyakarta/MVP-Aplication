'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'VARIANT',
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
        name: {
          type: Sequelize.DataTypes.STRING(115),
          allowNull: false,
        },
        type: {
          type: Sequelize.DataTypes.STRING(115),
          allowNull: false,
        },
        desc: {
          type: Sequelize.DataTypes.STRING(115),
          allowNull: false,
        },
        product_id: {
          type: Sequelize.DataTypes.STRING(22),
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable({
      tableName: 'VARIANT',
      schema: 'PRODUCTS',
    });
  },
};
