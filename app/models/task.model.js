import mongoose, { Schema } from 'mongoose'
import dbConnection from '../config/dbConfig.js'

const ObjectId = mongoose.Types.ObjectId

const TaskSchema = Schema(
  {
    description: String,
    state: String,
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

TaskSchema.statics.createTasks = async function ({
  description,
  state,
  user_id,
}) {
  try {
    const newTask = await this.create({
      description: description || 'Unknown Task',
      state,
      user_id,
    })
    return newTask
  } catch (e) {
    console.log(e.message)
  }
}

TaskSchema.statics.findTasks = async function ({ page, taskId, userId }) {
  try {
    let query = {},
      limit = 10,
      skip,
      pageNumber = parseInt(page)
    skip = pageNumber * 10 - 10
    if (taskId) query._id = ObjectId(taskId)
    if (userId) query.user_id = userId
    const tasks = await this.find(query).skip(skip).limit(limit)
    return tasks
  } catch (e) {
    console.log(e.message)
  }
}

TaskSchema.statics.updateTasks = async function ({
  description,
  state,
  user_id,
  taskId,
}) {
  try {
    let query = {},
      update
    if (description && state && user_id) {
      query._id = ObjectId(taskId)
      update = {
        description,
        state,
        user_id,
      }
    }
    const updatedTask = await this.findOneAndUpdate(query, update, {
      new: true,
    })
    return updatedTask
  } catch (e) {
    console.log(e.message)
  }
}

TaskSchema.statics.deleteTasks = async function ({ taskId }) {
  try {
    return await this.findOneAndDelete({ _id: ObjectId(taskId) })
  } catch (e) {
    console.log(e.message)
  }
}

export default dbConnection.model('Task', TaskSchema)
