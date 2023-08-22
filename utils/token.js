const jwt = require('jsonwebtoken');

const { KEY_MODE } = require('./constants');

const checkAuth = (token) => {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, KEY_MODE);
  } catch (err) {
    return false;
  }
};

module.exports = { checkAuth };
