import { config } from 'dotenv'
config()
import http from 'http'
import app from './app.js'

const portNumber = process.env.PORT || process.env.devPORT

http.createServer(app).listen(portNumber, () => {
  console.log(`Listening on ${portNumber}`)
})
