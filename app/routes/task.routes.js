import { create, find, update, remove } from '../controllers/task.controller.js'

import express from 'express'
const router = express.Router()

router
  .get('/:taskId?', find)
  .post('/', create)
  .put('/:taskId', update)
  .delete('/:taskId', remove)
  .get('/user/:user_id?', find)

export default router
