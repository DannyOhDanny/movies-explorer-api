const { ERR_INTERNAL_SERV } = require('./constants');
const { NotFound } = require('../errors/ERR_NOT_FOUND');
const { TXT_ERR_404, TXT_ERR_SERV } = require('./constants');

const handleErrors = (err, req, res, next) => {
  const status = err.statusCode || ERR_INTERNAL_SERV;
  const { name } = err;
  const message = status === ERR_INTERNAL_SERV ? TXT_ERR_SERV : err.message;

  res.status(status).send({ status, name, message });

  next();
};

const error404 = () => {
  throw new NotFound(TXT_ERR_404);
};
module.exports = { handleErrors, error404 };
