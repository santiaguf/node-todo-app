import {create, findAll, findOne, update, remove } from '../controllers/user.controller.js';

import express from 'express';
const router = express.Router();
const app = express();

router.
  get('/', findAll).
  get('/:userId', findOne).
  post('/', create).
  put('/:userId', update).
  delete('/:userId', remove);

export default router;
