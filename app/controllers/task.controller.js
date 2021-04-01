const Task = require('../models/task.model.js');

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description || !req.body.state || !req.body.user_id) {
    return res.status(400).send({
      message: 'Task can not be empty',
    });
  }

  // Create a task
  const task = new Task({
    description: req.body.description || 'Unknown task',
    state: req.body.state,
    user_id: req.body.user_id,
  });

  // Save Task in the database
  task.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating task.',
      });
    });
};

// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {
  Task.find()
    .then((tasks) => {
      res.send(tasks);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tasks.',
      });
    });
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
  Task.findById(req.params.taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: `Task not found with id ${req.params.taskId}`,
        });
      }
      res.send(task);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Task not found with id ${req.params.taskId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving task with id ${req.params.taskId}`,
      });
    });
};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.description || !req.body.state || !req.body.user_id) {
    return res.status(400).send({
      message: 'Task content can not be empty',
    });
  }

  // Find task and update it with the request body
  Task.findByIdAndUpdate(req.params.taskId, {
    description: req.body.description.trim() || 'Unknown task',
    state: req.body.state,
    user_id: req.body.user_id,
  }, { new: true })
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: `Task not found with id ${req.params.taskId}`,
        });
      }
      res.send(task);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Task not found with id ${req.params.taskId}`,
        });
      }
      return res.status(500).send({
        message: `Error updating task with id ${req.params.taskId}`,
      });
    });
};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {
  Task.findByIdAndRemove(req.params.taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: `Task not found with id ${req.params.taskId}`,
        });
      }
      res.send({ message: 'task deleted successfully!' });
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `task not found with id ${req.params.taskId}`,
        });
      }
      return res.status(500).send({
        message: `Could not delete task with id ${req.params.taskId}`,
      });
    });
};

// Retrieve all Task by user
exports.findByUserId = (req, res) => {
  Task.find({ user_id: req.params.userId })
    .then((tasks) => {
      res.send(tasks);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Tasks not found for user ID ${req.params.userId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving tasks for user ID ${req.params.userId}`,
      });
    });
};

exports.list_ui = (req, res) => {
  Task.find({ user_id: req.params.userId })
    .then((tasks) => {
      res.render('index-tasks', { });
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Tasks not found for user ID ${req.params.userId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving tasks for user ID ${req.params.userId}`,
      });
    });
};

exports.edit_ui = (req, res) => {
  Task.find({ user_id: req.params.taskId })
    .then((tasks) => {
      res.render('edit-task', { });
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Tasks not found for user ID ${req.params.userId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving tasks for user ID ${req.params.userId}`,
      });
    });
};
