const { ERR_CONFLICT } = require('../utils/constants');

class Conflict extends Error {
  constructor(message) {
    super();
    this.statusCode = ERR_CONFLICT;
    this.message = message;
  }
}

module.exports = { Conflict };
