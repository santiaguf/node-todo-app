import {create, findAll, findOne, update, remove, findByUserId } from '../controllers/task.controller.js';

import express from 'express';
const router = express.Router();

router.
  get('/', findAll).
  get('/:taskId', findOne).
  post('/', create).
  put('/:taskId', update).
  delete('/:taskId', remove).
  get('/user/:userId', findByUserId);

export default router;
