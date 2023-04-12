/* eslint-disable no-console */
import dotenv from 'dotenv';
dotenv.config();

import express, {urlencoded, json} from 'express';

import path from 'path';
import favicon from 'serve-favicon';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import { listUserUI, editUserUI } from './app/controllers/user.controller.js';
import { listTaskUI, editTaskUI } from './app/controllers/task.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

// create express app
const app = express();

import v1UserRouter from './app/routes/user.routes.js';
import v1TaskRouter from './app/routes/task.routes.js';

// favicon
app.use(favicon(path.join(__dirname, 'app', 'public', 'img', 'favicon.ico')));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(json());

// settings for Ejs
app.set('views', path.join(`${__dirname}/app/views`));
app.set('view engine', 'ejs');

// serving static files
app.use(express.static(__dirname + '/app/public'));

// Mongoose require
import { connect } from 'mongoose';

// Connecting to the database
connect(dbUrl, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Todo App.' });
});

// Require User routes
app.use("/v1/users", v1UserRouter);
app.use("/v1/tasks", v1TaskRouter);

// Views for frontend
app.get('/users-ui/', listUserUI);
app.get('/users-ui/edit/:userId', editUserUI);

app.get('/tasks-ui/user/:userId', listTaskUI);
app.get('/tasks-ui/edit/:taskId', editTaskUI);


// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});