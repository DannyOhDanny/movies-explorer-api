const { checkAuth } = require('../utils/token');
const { Unauthorized } = require('../utils/errors');

const auth = (req, res, next) => {
  if (!req.cookies) {
    throw new Unauthorized('Доступ отклонен');
  }
  const token = req.cookies.jwt;

  if (!token) {
    throw new Unauthorized('Токен отсутствует');
  }
  const payload = checkAuth(token);

  if (!payload) {
    throw new Unauthorized('Вы не авторизированы');
  }
  req.user = { payload };
  next();
};

module.exports = {
  auth,
};
