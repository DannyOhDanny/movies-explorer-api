/* eslint max-classes-per-file: ["error", 7] */
/* eslint no-use-before-define: ["error", { "classes": false }] */
const {
  ERR_BAD_REQUEST,
  ERR_UNAUTHORIZED,
  ERR_FORBIDDEN,
  ERR_NOT_FOUND,
  ERR_CONFLICT,
  ERR_INTERNAL_SERV,
} = require('./constants');

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return ERR_BAD_REQUEST;
    }
    if (this instanceof Unauthorized) {
      return ERR_UNAUTHORIZED;
    }
    if (this instanceof Forbidden) {
      return ERR_FORBIDDEN;
    }
    if (this instanceof NotFound) {
      return ERR_NOT_FOUND;
    }
    if (this instanceof ValidationError) {
      return ERR_CONFLICT;
    }
    if (this instanceof IncorrectCredentials) {
      return ERR_CONFLICT;
    }

    return ERR_INTERNAL_SERV;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class ValidationError extends GeneralError {}
class Unauthorized extends GeneralError {}
class IncorrectCredentials extends GeneralError {}
class Forbidden extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  ValidationError,
  Unauthorized,
  IncorrectCredentials,
  Forbidden,
};
