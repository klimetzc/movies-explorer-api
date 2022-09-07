const constants = require('../constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = constants.status400;
  }
}

module.exports = { BadRequestError };
