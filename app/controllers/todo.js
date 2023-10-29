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
    res.status(500).json({
      status: 'Error',
      message: error.message,
      data: null,
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
    res.status(500).json({
      status: 'Error',
      message: error.message,
      data: null,
    });
  }
};

const create = async (req, res) => {
  try {
    const { body } = req;
    const result = await todoRepository.createTodo(body);
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
      data: null,
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
    res.status(500).json({
      status: 'Error',
      message: error.message,
      data: null,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await todoRepository.updateTodo(id, body);
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
      data: null,
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
