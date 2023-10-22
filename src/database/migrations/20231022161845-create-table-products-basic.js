'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'BASIC',
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
        // -2 Banned;
        // -1 Pending
        //  0 Deleted;
        //  1 Active;
        //  2 Best;
        //  3 Inactive
        status: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 1,
        },
        // 1 Baru
        // 2 Bekas
        condition: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 1,
        },
        shortdesc: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        main_stock: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0,
        },
        reserve_stock: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0,
        },
        user_id: {
          type: Sequelize.DataTypes.STRING(22),
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
      tableName: 'BASIC',
      schema: 'PRODUCTS',
    });
  },
};
