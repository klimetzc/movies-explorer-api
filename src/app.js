require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const chalk = require('chalk');
// const { validator } = require('validator');
const { celebrate, Joi, errors } = require('celebrate');
const UserController = require('./controllers/Users.controller');
// const { constants } = require('./utils/constants');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./utils/Errors/NotFoundError');
const { errorHandling } = require('./middlewares/errorHandling');

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

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
  }),
}), UserController.signIn);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), UserController.createUser);

app.use('/movies', auth, require('./routes/movies.route'));
app.use('/users', auth, require('./routes/users.route'));

app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
}); // Несуществующий путь
app.use(errorHandling); // Централизованный обработчик

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
