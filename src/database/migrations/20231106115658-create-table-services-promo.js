'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'PROMO',
        schema: 'SERVICES',
      },
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(155),
          allowNull: false,
        },
        desc: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        start_time: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
        image: {
          type: Sequelize.DataTypes.STRING(75),
          allowNull: true,
        },
        price: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0,
        },
        discount: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0,
        },
        end_time: {
          type: Sequelize.DataTypes.DATE,
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
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'PROMOT',
      schema: 'SERVICES',
    });
  },
};
