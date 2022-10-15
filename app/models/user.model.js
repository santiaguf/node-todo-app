import mongoose, { Schema } from 'mongoose'
import dbConnection from '../config/dbConfig.js'
const ObjectId = mongoose.Types.ObjectId

const UserSchema = Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
)

UserSchema.statics.saveUsers = async function (requestBody) {
  try {
    const { name } = requestBody
    const newUser = await this.create({ name: name || 'Unknown user' })
    return newUser
  } catch (e) {
    console.log(e.message || 'Some error while saving data!')
  }
}

UserSchema.statics.findUsers = async function (data) {
  try {
    const { userId, page } = data
    let query = {},
      limit,
      skip,
      pageNumber = parseInt(page)
    if (!pageNumber || pageNumber < 1) pageNumber = 1
    if (userId) query._id = ObjectId(userId)
    skip = pageNumber * 10 - 10
    const result = await this.find(query).limit(limit).skip(skip)
    return result
  } catch (e) {
    console.log(e.message)
  }
}

UserSchema.statics.updateUsers = async function (data) {
  try {
    const { userId, name } = data
    let query = {},
      update = {}
    if (userId && name) {
      query._id = new ObjectId(userId)
      update.name = name.trim() || 'Unknown User'
    }
    const result = await this.findOneAndUpdate(query, update, { new: true })
    return result
  } catch (e) {
    console.log(e.message)
  }
}

UserSchema.statics.deleteUsers = async function ({ userId }) {
  try {
    let query = {}
    if (userId) query._id = new ObjectId(userId)
    const deletedUser = await this.findOneAndDelete(query)
    return deletedUser
  } catch (e) {
    console.log(e.message)
  }
}
export default dbConnection.model('User', UserSchema)
