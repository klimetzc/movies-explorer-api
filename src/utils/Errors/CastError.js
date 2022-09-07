const constants = require('../constants');

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.statusCode = constants.status400;
  }
}

module.exports = { CastError };
