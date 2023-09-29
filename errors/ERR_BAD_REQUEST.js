const { ERR_BAD_REQUEST } = require('../utils/constants');

class BadRequest extends Error {
  constructor(message) {
    super();
    this.statusCode = ERR_BAD_REQUEST;
    this.message = message;
  }
}

module.exports = { BadRequest };
