const Movie = require('../models/movie.schema');
const { BadRequestError } = require('../utils/Errors/BadRequestError');
const { NotFoundError } = require('../utils/Errors/NotFoundError');
const { ForbiddenError } = require('../utils/Errors/ForbiddenError');

class MoviesController {
  static getMovies = (req, res, next) => {
    Movie.find({ owner: req.user._id })
      .then((cards) => {
        res.send(cards);
      })
      .catch(next);
  };

  static createMovie = (req, res, next) => {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user,
    })
      .then((movie) => {
        res.send(movie);
      })
      .catch((e) => {
        if (e.name === 'ValidationError') {
          return next(
            new BadRequestError({
              message: 'Переданы некорректные данные при создании записи о фильме.',
            }),
          );
        }
        return next(e);
      });
  };

  static deleteMovie = (req, res, next) => {
    Movie.findById(req.params.movieId)
      .then((movie) => {
        if (!movie) return next(new NotFoundError('Фильм не найден'));
        if (movie.owner._id.toString() !== req.user._id) return next(new ForbiddenError({ message: 'Вы не являетесь автором записи о фильме.' }));
        return Movie.findByIdAndRemove(req.params.movieId)
          .then(() => {
            res.send({ message: 'Фильм удалён из избранного' });
          });
      })
      .catch((e) => {
        if (e.name === 'CastError') return next(new BadRequestError('Неверный запрос.'));
        return next(e);
      });
  };
}

module.exports = MoviesController;
