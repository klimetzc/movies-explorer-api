const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/Errors/NotFoundError');
const usersRouter = require('./users.route');
const moviesRouter = require('./movies.route');
const UserController = require('../controllers/Users.controller');

router.use('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), UserController.createUser);
router.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
  }),
}), UserController.signIn);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});
module.exports = router;
