const activityRepository = require('../repositories/activity');
const NotFoundError = require('../errors/NotFoundError');

const getAll = async (req, res) => {
  try {
    const result = await activityRepository.getActivityAll();
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
    const result = await activityRepository.getActivityById(id);
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
    const { email, title } = req.body;
    const result = await activityRepository.createActivity({ email, title });
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
    const result = await activityRepository.deleteActivity(id);
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
    const { email, title } = req.body;
    const result = await activityRepository.updateActivity(id, {
      email,
      title,
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
