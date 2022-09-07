const constants = require('../constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = constants.status409;
  }
}

module.exports = { ConflictError };
