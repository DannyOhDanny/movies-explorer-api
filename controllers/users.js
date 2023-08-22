const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { KEY_MODE, ST_CREATED, ST_OK } = require('../utils/constants');
const {
  GeneralError,
  BadRequest,
  Unauthorized,
  NotFound,
} = require('../utils/errors');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(ST_CREATED).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: `${user.name}, Вы успешно зарегистрированы.`,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.payload._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );
    res
      .status(ST_OK)
      .send({ user, message: `${user.name}, Ваши данные обновлены.` });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.payload._id);

    if (user === null) {
      throw new NotFound('Cписок пользователей пуст');
    }
    res.status(ST_OK).send({ user });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!req.body) {
      throw new GeneralError('На сервере произошла ошибка');
    }

    if (!email || !password) {
      throw new BadRequest('Не указан логин или пароль');
    }

    // if (!name) {
    //   throw new BadRequest('Не указано имя пользователя');
    // }

    const user = await User.findOne({ email }).select('+password');
    if (!user || user === null) {
      throw new Unauthorized('Такого пользователя не существует');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Unauthorized('Неверный логин или пароль');
    }

    const token = jwt.sign({ _id: user._id }, KEY_MODE, {
      expiresIn: '7d',
    });
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });

    res.status(ST_OK).send({
      _id: user._id,
      message: `${user.name}, вы успешно авторизированы!`,
    });
  } catch (err) {
    next(err);
  }
};

const signout = async (req, res) => {
  if (res.cookie) {
    await res.clearCookie('jwt');
    res.status(ST_OK).send({ message: 'Вы успешно вышли из своего аккаунта' });
  }
  if (!res.cookie) {
    throw new BadRequest('Неверные данные авторизации');
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  signin,
  signout,
};
