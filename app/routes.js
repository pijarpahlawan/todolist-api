const express = require('express');
const activityController = require('./controllers/activity');
const todoController = require('./controllers/todo');

const routes = express.Router();

// activity route
routes.get('/activity-groups', activityController.getAll);
routes.get('/activity-groups/:id', activityController.getOne);
routes.post('/activity-groups', activityController.create);
routes.delete('/activity-groups/:id', activityController.remove);
routes.patch('/activity-groups/:id', activityController.update);

// todo route
routes.get('/todo-items', todoController.getAll);
routes.get('/todo-items/:id', todoController.getOne);
routes.post('/todo-items', todoController.create);
routes.delete('/todo-items/:id', todoController.remove);
routes.patch('/todo-items/:id', todoController.update);

module.exports = routes;
