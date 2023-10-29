const activityRepository = require('../repositories/activity');

const getAll = async (req, res) => {
  try {
    const result = await activityRepository.getActivityAll();
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
    const result = await activityRepository.getActivityById(id);
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
    const result = await activityRepository.createActivity(body);
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
    const result = await activityRepository.deleteActivity(id);
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
    const result = await activityRepository.updateActivity(id, body);
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
