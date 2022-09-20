const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { UnauthorizedError } = require('../utils/Errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
    },
  },

  password: {
    required: true,
    type: String,
    select: false,
  },

  name: {
    required: true,
    type: String,
    minLength: 2,
    maxLength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
