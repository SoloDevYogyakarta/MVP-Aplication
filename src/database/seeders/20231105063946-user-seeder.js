const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const { nanoid } = require('nanoid');
const fs = require('fs');
const { join } = require('path');
('use strict');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hashSync('password', 15);
    const admin = {
      public_id: nanoid(),
      plat_number: `SS ${Math.floor(1000 + Math.random() * 9999)} SHA`,
      phone_number: faker.phone.number(),
      name: faker.person.fullName(),
      motor: faker.commerce.productName(),
      address: faker.location.streetAddress(),
      year_production: Math.floor(1000 + Math.random() * 2023),
      password,
    };
    fs.writeFileSync(
      join(__dirname, '../../utils/folder-text/user-admin-entity.txt'),
      JSON.stringify(admin),
    );
    return await queryInterface.bulkInsert(
      {
        tableName: 'USER',
        schema: 'AUTHENTICATE',
      },
      [admin],
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete(
      {
        tableName: 'USER',
        schema: 'AUTHENTICATE',
      },
      null,
      {},
    );
  },
};
