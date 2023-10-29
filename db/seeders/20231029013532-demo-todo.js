'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('todos', [
      {
        activity_group_id: '2',
        title: 'item1',
      },
      {
        activity_group_id: '2',
        title: 'item1',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  },
};
