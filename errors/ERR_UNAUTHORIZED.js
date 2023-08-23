const { ERR_UNAUTHORIZED } = require('../utils/constants');

class Unauthorized extends Error {
  constructor(message) {
    super();
    this.statusCode = ERR_UNAUTHORIZED;
    this.message = message;
  }
}

module.exports = { Unauthorized };
