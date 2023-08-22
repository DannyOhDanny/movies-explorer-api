const { celebrate, Joi } = require('celebrate');
const { MONGO_PATTERN } = require('../utils/constants');

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
      'string.email': '{#label} должен быть валидным',
    }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.min': 'Длина {#label} - не менее 8 символов ',
      'any.required': 'Поле {#label} обязательное',
    }),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
      'string.min': 'Длина {#label} - не менее 2 символов',
      'string.max': 'Длина {#label} - не более 30 символов',
    }),
    email: Joi.string().required().email().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
      'string.email': '{#label} должен быть валидным',
    }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.min': 'Длина {#label} - не менее 8 символов',
      'any.required': 'Поле {#label} обязательное',
    }),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.min': 'Длина {#label} - не менее 2 символов',
      'string.max': 'Длина {#label} - не более 30 символов',
    }),
    email: Joi.string().email().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.email': '{#label} должен быть валидным',
    }),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(MONGO_PATTERN).messages({
      'string.pattern.base': 'Поле {#label} должен быть в формате MongoId.',
    }),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    director: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    duration: Joi.number().required().messages({
      'number.base': 'Поле {#label} должно содержать только цифры.',
      'any.required': 'Поле {#label} обязательное',
    }),
    year: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    image: Joi.string().required().uri().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.uri': 'Поле {#label}: URL должен быть валидным',
      'any.required': 'Поле {#label} обязательное',
    }),
    trailerLink: Joi.string().required().uri().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.uri': 'Поле {#label}: URL должен быть валидным',
      'any.required': 'Поле {#label} обязательное',
    }),
    thumbnail: Joi.string().required().uri().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.uri': 'Поле {#label}: URL должен быть валидным',
      'any.required': 'Поле {#label} обязательное',
    }),
    movieId: Joi.number().required().messages({
      'number.base': 'Поле {#label} должно содержать только цифры.',
    }),
    nameRU: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    nameEN: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateUserValidation,
  idValidation,
  movieValidation,
};
