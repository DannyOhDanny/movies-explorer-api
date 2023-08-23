const {
  NODE_ENV, PORT, MOVIE_DB, SECRET_KEY,
} = process.env;

// Проверка на моуд
const MONGO_MODE = NODE_ENV === 'production' ? MOVIE_DB : 'mongodb://127.0.0.1:27017/bitfilmsdb';
const KEY_MODE = NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret';
const PORT_MODE = NODE_ENV === 'production' ? PORT : 3001;

// Ответ сервера
const ST_CREATED = 201;
const ST_OK = 200;

// Коды ошибок
const ERR_BAD_REQUEST = 400;
const ERR_UNAUTHORIZED = 401;
const ERR_FORBIDDEN = 403;
const ERR_NOT_FOUND = 404;
const ERR_CONFLICT = 409;
const ERR_INTERNAL_SERV = 500;

// RegExp
const MONGO_PATTERN = /^[0-9a-fA-F]{24}$/;

module.exports = {
  KEY_MODE,
  MONGO_MODE,
  PORT_MODE,
  ST_CREATED,
  ST_OK,
  ERR_BAD_REQUEST,
  ERR_UNAUTHORIZED,
  ERR_FORBIDDEN,
  ERR_NOT_FOUND,
  ERR_CONFLICT,
  ERR_INTERNAL_SERV,
  MONGO_PATTERN,
};
