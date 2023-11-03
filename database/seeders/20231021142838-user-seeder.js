'use strict';

const { faker } = require('@faker-js/faker');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const makePassword = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await makePassword('password');
    return queryInterface.bulkInsert(
      {
        tableName: 'USER',
        schema: 'AUTHENTICATE',
      },
      [
        {
          public_id: nanoid(),
          full_name: faker.person.fullName(),
          plat_number: `AA ${Math.floor(1000 + Math.random()) * 9000} HFS`,
          phone_number: faker.phone.number().replace(/-/g, ''),
          motor: faker.commerce.productName(),
          year_production: faker.number.int({ min: 1000, max: 2023 }),
          address: faker.location.streetAddress(),
          role: 'admin',
          password,
        },
        {
          public_id: nanoid(),
          full_name: faker.person.fullName(),
          plat_number: `AA ${Math.floor(1000 + Math.random()) * 9000} HFS`,
          phone_number: faker.phone.number().replace(/-/g, ''),
          motor: faker.commerce.productName(),
          year_production: faker.number.int({ min: 1000, max: 2023 }),
          address: faker.location.streetAddress(),
          role: 'member',
          password,
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      {
        tableName: 'USER',
        schema: 'AUTHENTICATE',
      },
      null,
      {},
    );
  },
};
