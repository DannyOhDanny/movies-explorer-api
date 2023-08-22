require('dotenv').config();
const express = require('express');
const cookies = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const { PORT_MODE, MONGO_MODE } = require('./utils/constants');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleErrors } = require('./utils/handleErrors');
const corsHandling = require('./middlewares/cors');

/* require('crypto').randomBytes(48, (err, buffer) => {
  const token = buffer.toString('hex');
}); */

const app = express(); // создаем сервер

// Middlewares
app.use(cookies()); // осуществляет работу с куками в коде сервера
app.use(helmet()); // защищает приложение от веб-уязвимостей через настройку заголовков
app.use(express.json()); // подключаем парсер .json
app.use(requestLogger); // подключаем логгер запросов
app.use(corsHandling); // разрешает кросс-доменные запросы
app.use(limiter); // ограничивает количество запросов

// Роуты
app.use(routes);

// Обработка ошибок
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // стандартные ошибки
app.use(handleErrors); // кастомные ошибки

// Подключение БД
mongoose.connect(MONGO_MODE);

// Запуск порта + статус МongoDB
app.listen(PORT_MODE, () => {
  console.log(`App is listening to port: ${PORT_MODE}`);
  const mongo = mongoose.connection.readyState;
  if (mongo === 1 || mongo === 2) {
    console.log('Mongo ON!');
  } else {
    console.log('Mongo OFF!');
  }
});
