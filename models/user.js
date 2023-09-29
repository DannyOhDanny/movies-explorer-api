const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Обязательное поле'],
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символов'],
    },
    email: {
      type: String,
      required: [true, 'Обязательное поле'],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный Email',
      },
      unique: true,
    },
    password: {
      required: [true, 'Обязательное поле'],
      type: String,
      minlength: 8,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
