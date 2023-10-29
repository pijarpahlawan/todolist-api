'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      todoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      activityGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'activity_group_id',
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'title',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active',
      },
      priority: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'priority',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'deleted_at',
      },
    });

    await queryInterface.addConstraint('todos', {
      fields: ['activity_group_id'],
      type: 'foreign key',
      name: 'fk_activity_group_id',
      references: {
        table: 'activities',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('todos', 'fk_activity_group_id');

    await queryInterface.dropTable('todos');
  },
};
