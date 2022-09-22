const constants = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.status403;
    this.name = 'ForbiddenError';
  }
}

module.exports = { ForbiddenError };
