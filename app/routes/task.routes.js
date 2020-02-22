module.exports = (app) => {
    const tasks = require('../controllers/task.controller.js');

    // Create a new Task
    app.post('/tasks', tasks.create);

    // Retrieve all Tasks
    app.get('/tasks', tasks.findAll);

    // Retrieve a single Task with taskId
    app.get('/tasks/:taskId', tasks.findOne);

    // Update a Task with taskId
    app.put('/tasks/:taskId', tasks.update);

    // Delete a Task with taskId
    app.delete('/tasks/:taskId', tasks.delete);

    // Retrieve all Task by user
    app.get('/tasks/user/:userId', tasks.findByUserId);

    //Views for frontend
    app.get('/tasks-ui/user/:userId', tasks.list_ui);

    app.post('/tasks-ui/user/:userId', tasks.list_ui);

}