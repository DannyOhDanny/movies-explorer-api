const { checkAuth } = require('../utils/token');
const { Unauthorized } = require('../errors/ERR_UNAUTHORIZED');
const {
  TXT_ERR_ACCESS_FORBIDDEN,
  TXT_ERR_TOKEN_NULL,
  TXT_ERR_USER_UNAUTHORIZED,
} = require('../utils/constants');

const auth = (req, res, next) => {
  if (!req.cookies) {
    throw new Unauthorized(TXT_ERR_ACCESS_FORBIDDEN);
  }
  const token = req.cookies.jwt;

  if (!token) {
    throw new Unauthorized(TXT_ERR_TOKEN_NULL);
  }
  const payload = checkAuth(token);

  if (!payload) {
    throw new Unauthorized(TXT_ERR_USER_UNAUTHORIZED);
  }
  req.user = { payload };
  next();
};

module.exports = {
  auth,
};
