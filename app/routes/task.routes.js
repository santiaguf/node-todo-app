module.exports = (app) => {
  const tasks = require('../controllers/task.controller.js');

  // Create a new Task
  app.post('/v1/tasks', tasks.create);

  // Retrieve all Tasks
  app.get('/v1/tasks', tasks.findAll);

  // Retrieve a single Task with taskId
  app.get('/v1/tasks/:taskId', tasks.findOne);

  // Update a Task with taskId
  app.put('/v1/tasks/:taskId', tasks.update);

  // Delete a Task with taskId
  app.delete('/v1/tasks/:taskId', tasks.delete);

  // Retrieve all Task by user
  app.get('/v1/tasks/user/:userId', tasks.findByUserId);

  // Views for frontend
  app.get('/tasks-ui/user/:userId', tasks.list_ui);

  app.get('/tasks-ui/edit/:taskId', tasks.edit_ui);
};
