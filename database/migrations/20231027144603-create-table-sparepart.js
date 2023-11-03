'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'SPAREPART',
        schema: 'public',
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
        },
        text: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'SPAREPART',
      schema: 'public',
    });
  },
};
