const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const UserController = require('../controllers/Users.controller');

router.get('/me', UserController.getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), UserController.patchUser);

module.exports = router;
