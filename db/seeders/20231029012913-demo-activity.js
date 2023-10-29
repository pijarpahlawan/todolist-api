'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('activities', [
      {
        email: 'ad0286a7-bec4-405c-96e2-cd472c18a1e7@skyshi.com',
        title: 'coba 4',
      },
      {
        email: 'wow@gmail.com',
        title: 'test',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('activities', null, {});
  },
};
