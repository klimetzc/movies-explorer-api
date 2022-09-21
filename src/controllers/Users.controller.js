const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { BadRequestError } = require('../utils/Errors/BadRequestError');
const { ConflictError } = require('../utils/Errors/ConflictError');
const { NotFoundError } = require('../utils/Errors/NotFoundError');
const User = require('../models/user.schema');
const constants = require('../utils/constants');

class UserController {
  static createUser = (req, res, next) => {
    const { email, password, name } = req.body;

    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email,
        password: hash,
        name,
      }))
      .then((newUser) => {
        res.status(201).send({
          data: {
            _id: newUser._id,
            email,
            name,
          },
        });
      })
      .catch((e) => {
        if (e.code === 11000) return next(new ConflictError('Такой пользователь уже существует'));
        if (e.name === 'ValidationError') return next(new BadRequestError('Переданы некорректные данные'));
        return next(e);
      });
  };

  static signIn = (req, res, next) => {
    const { email, password } = req.body;
    User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET || constants.jwtSecretKey,
          { expiresIn: '7d' },
        );
        res.send({ data: token });
      })
      .catch(next);
  };

  static getMe = (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) return next(new NotFoundError('Пользователь не найден'));
        res.send({ data: user });
      })
      .catch(next);
  };

  static patchUser = (req, res, next) => {
    const { email, name } = req.body;
    User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) return next(new NotFoundError('Пользователь не найден.'));
        res.send({ data: user });
      })
      .catch((e) => {
        if (e.code === 11000) return next(new ConflictError('Такой пользователь уже существует.'));
        if (e.name === 'ValidationError') return next(new BadRequestError('Переданы некорректные данные.'));
        return next(e);
      });
  };
}

module.exports = UserController;
