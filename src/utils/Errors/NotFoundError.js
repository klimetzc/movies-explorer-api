const constants = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    // this.message = message;
    super(message);
    this.statusCode = constants.status404;
    this.name = 'NotFoundError';
  }
}

module.exports = { NotFoundError };
