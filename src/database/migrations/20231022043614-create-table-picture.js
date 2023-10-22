'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'FILE',
        schema: 'COMMONS',
      },
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: false,
          allowNull: false,
        },
        public_id: {
          type: Sequelize.DataTypes.STRING(22),
          unique: false,
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
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'PICTURE',
      schema: 'COMMONS',
    });
  },
};
