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
        plat_number: {
          type: Sequelize.DataTypes.STRING(22),
          unique: false,
        },
        phone_number: {
          type: Sequelize.DataTypes.STRING(22),
          allowNull: false,
        },
        full_name: {
          type: Sequelize.DataTypes.STRING(75),
          allowNull: false,
        },
        motor: {
          type: Sequelize.DataTypes.STRING(75),
          allowNull: false,
        },
        year_production: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        address: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
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
