module.exports = (app) => {
  const users = require('../controllers/user.controller.js');

  // Create a new User
  app.post('/v1/users', users.create);

  // Retrieve all Users
  app.get('/v1/users', users.findAll);

  // Retrieve a single User with userId
  app.get('/v1/users/:userId', users.findOne);

  // Update a User with userId
  app.put('/v1/users/:userId', users.update);

  // Delete a User with userId
  app.delete('/v1/users/:userId', users.delete);

  // Views for frontend
  app.get('/users-ui/', users.list_ui);

  app.get('/users-ui/edit/:userId', users.edit_ui);
};
