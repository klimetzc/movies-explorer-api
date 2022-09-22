require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const chalk = require('chalk');
const { errors } = require('celebrate');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { errorHandling } = require('./middlewares/errorHandling');
const routes = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbPath = process.env.DB_PATH || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'moviesdb';

mongoose.connect(`${dbPath}/${dbName}`, {}, (err) => {
  if (err) console.log(chalk.bgRed('DATABASE CONNECTION FAILED'));
  else console.log(chalk.bgGreen('DATABASE CONNECTED'));
});

app.use(requestLogger);

app.use(cors());

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandling); // Централизованный обработчик

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
