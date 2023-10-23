'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'STOCK',
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
        use_stock: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
        value: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0,
        },
        stock_wording: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        },
        product_id: {
          type: Sequelize.DataTypes.STRING(22),
          unique: false,
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'STOCK',
      schema: 'PRODUCTS',
    });
  },
};
