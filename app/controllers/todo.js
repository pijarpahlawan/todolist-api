const todoRepository = require('../repositories/todo');

const getAll = async (req, res) => {
  try {
    const result = await todoRepository.getTodoAll();
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(error.code).json({
      status: error.status,
      message: error.message,
      data: {},
    });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoRepository.getTodoById(id);
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(error.code).json({
      status: error.status,
      message: error.message,
      data: {},
    });
  }
};

const create = async (req, res) => {
  try {
    const { activity_group_id, title, is_active } = req.body;
    const result = await todoRepository.createTodo({
      title,
      activityGroupId: activity_group_id,
      isActive: is_active,
    });
    res.status(201).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(error.code).json({
      status: error.status,
      message: error.message,
      data: {},
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoRepository.deleteTodo(id);
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(error.code).json({
      status: error.status,
      message: error.message,
      data: {},
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { activity_group_id, title, is_active } = req.body;
    const result = await todoRepository.updateTodo(id, {
      title,
      activityGroupId: activity_group_id,
      isActive: is_active,
    });
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(error.code).json({
      status: error.status,
      message: error.message,
      data: {},
    });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
