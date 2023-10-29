const { Sequelize, Transaction, ValidationError } = require('sequelize');
const { Activity } = require('../models');
const {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} = require('../errors');

const env = process.env.NODE_ENV || 'development';
const dbconfig = require('../../config/database')[env];

const getActivityAll = async () => {
  const sequelize = new Sequelize(dbconfig);

  try {
    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const activities = await Activity.findAll({ transaction });
        return activities;
      },
    );

    return result;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const getActivityById = async (id) => {
  const sequelize = new Sequelize(dbconfig);

  try {
    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const activity = await Activity.findByPk(id, { transaction });

        if (activity === null)
          throw new NotFoundError(`Activity with ID ${id} Not Found`);

        return activity;
      },
    );

    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    else throw new InternalServerError(error.message);
  }
};

const createActivity = async (activity) => {
  const sequelize = new Sequelize(dbconfig);

  try {
    if (activity.email === undefined)
      throw new BadRequestError('email cannot be null');
    if (activity.title === undefined)
      throw new BadRequestError('title cannot be null');

    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const newActivity = await Activity.create(activity, { transaction });
        return newActivity;
      },
    );

    return result;
  } catch (error) {
    if (error instanceof BadRequestError) throw error;
    else throw new InternalServerError(error.message);
  }
};

const deleteActivity = async (id) => {
  const sequelize = new Sequelize(dbconfig);

  try {
    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const activity = await Activity.findByPk(id, { transaction });

        if (activity === null)
          throw new NotFoundError(`Activity with ID ${id} Not Found`);

        await activity.destroy({ transaction });

        return {};
      },
    );

    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    else throw new InternalServerError(error.message);
  }
};

const updateActivity = async (id, activity) => {
  const sequelize = new Sequelize(dbconfig);

  try {
    if (activity.email === undefined)
      throw new BadRequestError('email cannot be null');
    if (activity.title === undefined)
      throw new BadRequestError('title cannot be null');

    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const updated = await Activity.update(activity, {
          where: { id },
          transaction,
        });

        if (updated[0] === 0)
          throw new NotFoundError(`Activity with ID ${id} Not Found`);

        const updatedActivityData = await Activity.findByPk(id, {
          transaction,
        });

        return updatedActivityData;
      },
    );

    return result;
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError)
      throw error;
    else throw new InternalServerError(error.message);
  }
};

module.exports = {
  getActivityAll,
  getActivityById,
  createActivity,
  deleteActivity,
  updateActivity,
};
