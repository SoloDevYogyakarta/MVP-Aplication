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
          username: 'admin',
          email: 'admin@yahoo.com',
          role: 'admin',
          password,
        },
        {
          public_id: nanoid(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
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
