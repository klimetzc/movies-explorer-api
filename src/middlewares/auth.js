const jsonwebtoken = require('jsonwebtoken');
const { jwtSecretKey } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const { UnauthorizedError } = require('../utils/Errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  console.log('jwt token: ', authorization);
  let payload;

  try {
    payload = jsonwebtoken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtSecretKey);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
  return payload;
};
