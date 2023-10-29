const express = require('express');
const activityController = require('./controllers/activity');

const routes = express.Router();

// activity route
routes.get('/activity-groups', activityController.getAll);
routes.get('/activity-groups/:id', activityController.getOne);
routes.post('/activity-groups', activityController.create);
routes.delete('/activity-groups/:id', activityController.remove);
routes.put('/activity-groups/:id', activityController.update);

module.exports = routes;
