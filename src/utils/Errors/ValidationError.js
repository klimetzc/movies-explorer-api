const constants = require('../constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = constants.status400;
  }
}

module.exports = { ValidationError };
