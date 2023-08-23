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

// Сообщения ошибок
const TXT_ERR_404 = 'Ошибка 404. Страница не найдена';
const TXT_ERR_SERV = 'На сервере произошла ошибка';
const TXT_ERR_USER_EMAIL_CONFLICT = 'Пользователь с такими электронным адресом уже существует';
const TXT_ERR_USER_NOT_FOUND = 'Пользователь не найден';
const TXT_ERR_NO_CREDENTIALS = 'Не указан логин или пароль';
const TXT_ERR_NO_USER = 'Такого пользователя не существует';
const TXT_ERR_BAD_CREDENTIALS = 'Неверные данные авторизации';
const TXT_ERR_BAD_MOVIE_DATA = 'Ошибка валидации данных';
const TXT_ERR_ID_DUPLICATE = 'Фильм с таким ID уже есть в базе данных';
const TXT_ERR_MOVIE_NULL = 'Cписок фильмов пуст';
const TXT_ERR_ID_FORMAT_INVALID = 'Формат ID фильма - неверный';
const TXT_ERR_ID_NULL = 'Фильма с таким ID не найдено';
const TXT_ERR_ID_FORBIDDEN = 'Удаление чужих фильмов - запрещено.';
const TXT_ERR_ACCESS_FORBIDDEN = 'Доступ отклонен';
const TXT_ERR_TOKEN_NULL = 'Токен отсутствует';
const TXT_ERR_USER_UNAUTHORIZED = 'Вы не авторизированы';

// RegExp
const MONGO_PATTERN = /^[0-9a-fA-F]{24}$/;
const URI_PATTERN = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
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
  URI_PATTERN,
  TXT_ERR_404,
  TXT_ERR_SERV,
  TXT_ERR_USER_EMAIL_CONFLICT,
  TXT_ERR_USER_NOT_FOUND,
  TXT_ERR_NO_CREDENTIALS,
  TXT_ERR_NO_USER,
  TXT_ERR_BAD_CREDENTIALS,
  TXT_ERR_BAD_MOVIE_DATA,
  TXT_ERR_ID_DUPLICATE,
  TXT_ERR_MOVIE_NULL,
  TXT_ERR_ID_FORMAT_INVALID,
  TXT_ERR_ID_NULL,
  TXT_ERR_ID_FORBIDDEN,
  TXT_ERR_ACCESS_FORBIDDEN,
  TXT_ERR_TOKEN_NULL,
  TXT_ERR_USER_UNAUTHORIZED,
};
