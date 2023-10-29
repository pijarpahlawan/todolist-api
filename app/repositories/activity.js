const { Sequelize, Transaction } = require('sequelize');
const { Activity } = require('../models');

const env = process.env.NODE_ENV || 'development';
const dbconfig = require('../../config/database')[env];

const getActivityAll = async () => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const activities = await Activity.findAll({ transaction });
      return activities;
    },
  );

  return result;
};

const getActivityById = async (id) => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const activity = await Activity.findByPk(id, { transaction });
      return activity;
    },
  );

  return result;
};

const createActivity = async (activity) => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const newActivity = await Activity.create(activity, { transaction });
      return newActivity;
    },
  );

  return result;
};

const deleteActivity = async (id) => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const activity = await Activity.findByPk(id, { transaction });
      await activity.destroy({ transaction });
      return {};
    },
  );

  return result;
};

const updateActivity = async (id, activity) => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      await Activity.update(activity, {
        where: { id },
        transaction,
      });
      const updatedActivityData = await Activity.findByPk(id, {
        transaction,
      });
      return updatedActivityData;
    },
  );

  return result;
};

module.exports = {
  getActivityAll,
  getActivityById,
  createActivity,
  deleteActivity,
  updateActivity,
};
