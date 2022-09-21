const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const MoviesController = require('../controllers/Movies.controller');

router.get('/', MoviesController.getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Поле image заполнено некорректно.');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Поле trailerLink заполнено некорректно.');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Поле thumbnail заполнено некорректно.');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), MoviesController.createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((id, helper) => {
      if (/^[0-9a-fA-F]{24}$/.test(id)) return id;
      return helper.message('Передан некорректный id.');
    }),
  }),
}), MoviesController.deleteMovie);

module.exports = router;
