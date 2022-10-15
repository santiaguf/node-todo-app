import { create, find, update, remove } from '../controllers/user.controller.js'

import express from 'express'
const router = express.Router()

router
  .get('/:userId', find)
  .post('/', create)
  .put('/:userId', update)
  .delete('/:userId', remove)

export default router
