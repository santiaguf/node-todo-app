import Task from '../models/task.model.js'

// Create and Save a new Task
export async function create(req, res) {
  try {
    // Validate request
    if (!req.body.description || !req.body.state || !req.body.user_id) {
      return res.status(400).send({
        message: 'Task can not be empty',
      })
    }
    const { description, state, user_id } = req.body
    const newTask = await Task.createTasks({ description, state, user_id })
    res.status(200).send(newTask)
  } catch (e) {
    res.status(500).send({
      message: e.message || 'Some error occurred while creating task.',
    })
  }
}

// Retrieve and return all tasks from the database.
export async function find(req, res) {
  try {
    const tasks = await Task.findTasks({
      page: req.query.page,
      taskId: req.params.taskId,
      userId: req.params.user_id,
    })
    res.status(200).send(tasks)
  } catch (e) {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving tasks.',
    })
  }
}

// Find a single task with a taskId
export function findOne(req, res) {
  Task.findById(req.params.taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: `Task not found with id ${req.params.taskId}`,
        })
      }
      res.send(task)
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Task not found with id ${req.params.taskId}`,
        })
      }
      return res.status(500).send({
        message: `Error retrieving task with id ${req.params.taskId}`,
      })
    })
}

// Update a task identified by the taskId in the request
export async function update(req, res) {
  try {
    if (!req.body.description || !req.body.state || !req.body.user_id) {
      return res.status(400).send({
        message: 'Task content can not be empty',
      })
    }
    const { description, state, user_id } = req.body
    const updatedTask = await Task.updateTasks({
      taskId: req.params.taskId,
      description,
      state,
      user_id,
    })
    if (!updatedTask) {
      res.status(404).send({
        message: `Task not found with id ${req.params.taskId}`,
      })
    }
    res.status(200).send(updatedTask)
  } catch (e) {
    res.status(500).send({
      message: `Error updating task with id ${req.params.taskId}`,
    })
  }
}

// Delete a task with the specified taskId in the request
export async function remove(req, res) {
  try {
    const deletedTask = await Task.deleteTasks({ taskId: req.params.taskId })
    if (!deletedTask)
      return res.status(404).send({
        message: `Task not found with id ${req.params.taskId}`,
      })
    res.send({ message: 'task deleted successfully!' })
  } catch (e) {
    if (e.kind === 'ObjectId' || e.name === 'NotFound')
      return res.status(404).send({
        message: `task not found with id ${req.params.taskId}`,
      })
    res.status(500).send({ message: e.message })
  }
}

export function listTaskUI(req, res) {
  Task.find({ user_id: req.params.userId })
    .then((tasks) => {
      res.render('index-tasks', {})
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Tasks not found for user ID ${req.params.userId}`,
        })
      }
      return res.status(500).send({
        message: `Error retrieving tasks for user ID ${req.params.userId}`,
      })
    })
}

export function editTaskUI(req, res) {
  Task.find({ user_id: req.params.taskId })
    .then((tasks) => {
      res.render('edit-task', {})
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Tasks not found for user ID ${req.params.userId}`,
        })
      }
      return res.status(500).send({
        message: `Error retrieving tasks for user ID ${req.params.userId}`,
      })
    })
}
