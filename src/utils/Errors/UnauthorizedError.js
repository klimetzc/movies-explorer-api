const constants = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.status401;
    this.name = 'UnauthorizedError';
  }
}

module.exports = { UnauthorizedError };
