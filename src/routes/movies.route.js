const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
const MoviesController = require('../controllers/Movies.controller');

router.get('/', MoviesController.getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
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
