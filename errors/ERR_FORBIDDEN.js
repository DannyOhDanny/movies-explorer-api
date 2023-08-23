const { ERR_FORBIDDEN } = require('../utils/constants');

class Forbidden extends Error {
  constructor(message) {
    super();
    this.statusCode = ERR_FORBIDDEN;
    this.message = message;
  }
}

module.exports = { Forbidden };
