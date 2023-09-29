const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    director: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    duration: {
      type: Number,
      required: [true, 'Обязательное поле'],
    },
    year: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    description: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    image: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Обязательное поле'],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Обязательное поле'],
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Обязательное поле'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      // required: [true, 'Обязательное поле'],
    },
    movieId: {
      type: Number,
      required: [true, 'Обязательное поле'],
    },
    nameRU: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    nameEN: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', userSchema);
