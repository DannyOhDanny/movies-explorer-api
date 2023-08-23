const { ERR_NOT_FOUND } = require('../utils/constants');

class NotFound extends Error {
  constructor(message) {
    super();
    this.statusCode = ERR_NOT_FOUND;
    this.message = message;
  }
}

module.exports = { NotFound };
