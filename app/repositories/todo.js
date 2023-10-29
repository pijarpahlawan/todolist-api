const { Sequelize, Transaction } = require('sequelize');
const { Todo } = require('../models');

const env = process.env.NODE_ENV || 'development';
const dbconfig = require('../../config/database')[env];

const getTodoAll = async () => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const todos = await Todo.findAll({ transaction });
      return todos;
    },
  );

  return result;
};

const getTodoById = async (id) => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const todo = await Todo.findByPk(id, { transaction });
      return todo;
    },
  );

  return result;
};

const createTodo = async (todo) => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const newTodo = await Todo.create(todo, { transaction });
      return newTodo;
    },
  );

  return result;
};

const deleteTodo = async (id) => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const todo = await Todo.findByPk(id, { transaction });
      await todo.destroy({ transaction });
      return {};
    },
  );

  return result;
};

const updateTodo = async (id, todo) => {
  const sequelize = new Sequelize(dbconfig);

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      await Todo.update(todo, { where: { id } }, { transaction });
      const updatedTodoData = await Todo.findByPk(id, {
        transaction,
      });
      return updatedTodoData;
    },
  );

  return result;
};

module.exports = {
  getTodoAll,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
};
