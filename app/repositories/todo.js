const {
  Sequelize,
  Transaction,
  ForeignKeyConstraintError,
} = require('sequelize');
const { Todo } = require('../models');
const {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} = require('../errors');

const env = process.env.NODE_ENV || 'development';
const dbconfig = require('../../config/database')[env];

const getTodoAll = async () => {
  const sequelize = new Sequelize(dbconfig);

  try {
    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const todos = await Todo.findAll({ transaction });
        return todos;
      },
    );

    return result;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const getTodoById = async (id) => {
  const sequelize = new Sequelize(dbconfig);

  try {
    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const todo = await Todo.findByPk(id, { transaction });

        if (todo === null)
          throw new NotFoundError(`Todo with ID ${id} Not Found`);

        return todo;
      },
    );

    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    else throw new InternalServerError(error.message);
  }
};

const createTodo = async (todo) => {
  const sequelize = new Sequelize(dbconfig);

  try {
    if (todo.activityGroupId === undefined)
      throw new BadRequestError('activity_group_id cannot be null');
    if (todo.title === undefined)
      throw new BadRequestError('title cannot be null');

    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const newTodo = await Todo.create(todo, { transaction });
        return newTodo;
      },
    );

    return result;
  } catch (error) {
    if (error instanceof BadRequestError) throw error;
    else if (error instanceof ForeignKeyConstraintError)
      throw new BadRequestError('activity_group_id not found');
    else throw new InternalServerError(error.message);
  }
};

const deleteTodo = async (id) => {
  const sequelize = new Sequelize(dbconfig);

  try {
    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const todo = await Todo.findByPk(id, { transaction });

        if (todo === null)
          throw new NotFoundError(`Todo with ID ${id} Not Found`);

        await todo.destroy({ transaction });
        return {};
      },
    );

    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    else throw new InternalServerError(error.message);
  }
};

const updateTodo = async (id, todo) => {
  const sequelize = new Sequelize(dbconfig);

  try {
    if (todo.activityGroupId === undefined)
      throw new BadRequestError('activity_group_id cannot be null');
    if (todo.title === undefined)
      throw new BadRequestError('title cannot be null');

    const result = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (transaction) => {
        const updated = await Todo.update(
          todo,
          { where: { id } },
          { transaction },
        );

        if (updated[0] === 0)
          throw new NotFoundError(`Todo with ID ${id} Not Found`);

        const updatedTodoData = await Todo.findByPk(id, {
          transaction,
        });

        return updatedTodoData;
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
  getTodoAll,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
};
