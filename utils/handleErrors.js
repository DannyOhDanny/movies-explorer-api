const { GeneralError, NotFound } = require('./errors');
const {
  ERR_BAD_REQUEST,
  ERR_INTERNAL_SERV,
  ERR_CONFLICT,
} = require('./constants');

const handleErrors = (err, req, res) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      code: res.statusCode,
      status: err.name,
      message: err.message,
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(ERR_BAD_REQUEST).json({
      code: res.statusCode,
      status: err.name,
      message: ['Ошибка валидации', err.message],
    });
  }
  if (err.code === 11000) {
    return res.status(ERR_CONFLICT).json({
      code: res.statusCode,
      status: err.name,
      message: err.message,
    });
  }

  if (err.name === 'MongoServerError') {
    return res.status(ERR_CONFLICT).json({
      code: res.statusCode,
      status: err.name,
      message: err.message,
    });
  }

  return res.status(ERR_INTERNAL_SERV).json({
    code: res.statusCode,
    status: err.name,
    message: 'На сервере произошла ошибка',
  });
};

// eslint-disable-next-line no-unused-vars
const error404 = (req, res) => {
  throw new NotFound('Ошибка 404. Страница не найдена');
};
module.exports = { handleErrors, error404 };
