import { createConnection } from 'mongoose'
import { config } from 'dotenv'
config()

const dbConnection = createConnection(process.env.dbURLProd, {
  maxPoolSize: 10,
})

dbConnection.on('connected', () => {
  console.log('MongoDB connection successful!')
})

dbConnection.on('error', (err) => {
  console.log('Mongoose connection error' + err)
})

export default dbConnection
