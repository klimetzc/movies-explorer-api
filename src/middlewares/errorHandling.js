module.exports.errorHandling = (err, req, res, next) => {
  const {
    statusCode = 500,
    message = 'Ошибка на стороне сервера. Попробуйте позже',
  } = err;
  res.status(statusCode).send({ message });

  next();
};
