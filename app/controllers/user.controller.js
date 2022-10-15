import User from '../models/user.model.js'

// Create and Save a new User
export async function create(req, res) {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: 'User can not be empty',
      })
    }
    const newUser = await User.createUsers(req.body)
    res.status(200).send(newUser)
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

// Retrieve and return all users from the database.
export async function find(req, res) {
  try {
    const users = await User.findUsers({
      page: req.query.page,
      userId: req.query.userId,
    })
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving users.',
    })
  }
}

// Update a user identified by the userId in the request
export async function update(req, res) {
  // Validate Request
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: 'User content can not be empty',
      })
    }
    const updatedUser = await User.updateUsers({
      userId: req.params.userId,
      name: req.body.name,
    })
    if (!updatedUser)
      res
        .status(404)
        .send({ message: `User not found with id ${req.params.userId}` })
    res.status(200).send(updatedUser)
  } catch (e) {
    console.log(e.message)
    if (e.kind === 'ObjectId')
      return res.status(404).send({
        message: `User not found with id ${req.params.userId}`,
      })
    res
      .status(500)
      .send({ message: `Error updating user with id ${req.params.userId}` })
  }
}

// Delete a user with the specified userId in the request
export async function remove(req, res) {
  try {
    const { userId } = req.params
    const deletedUser = await User.deleteUsers({ userId })
    if (!deletedUser)
      res.status(404).send({
        message: `User not found with id ${req.params.userId}`,
      })
    res.send({ message: 'user deleted successfully!' })
  } catch (e) {
    if (e.kind === 'ObjectId' || e.name === 'NotFound') {
      res.status(404).send({
        message: `user not found with id ${req.params.userId}`,
      })
    }
    res.status(500).send({ message: e.message })
  }
}

export function listUserUI(req, res) {
  User.find()
    .then((users) => {
      res.render('index-users', {
        // users
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
}

export function editUserUI(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      res.render('edit-user', {
        // user
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
}
