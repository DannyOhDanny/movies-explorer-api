const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { Conflict } = require('../errors/ERR_CONFLICT');
const { BadRequest } = require('../errors/ERR_BAD_REQUEST');
const { NotFound } = require('../errors/ERR_NOT_FOUND');
const { Unauthorized } = require('../errors/ERR_UNAUTHORIZED');
const {
  KEY_MODE,
  ST_CREATED,
  ST_OK,
  TXT_ERR_USER_EMAIL_CONFLICT,
  TXT_ERR_USER_NOT_FOUND,
  TXT_ERR_SERV,
  TXT_ERR_NO_CREDENTIALS,
  TXT_ERR_NO_USER,
  TXT_ERR_BAD_CREDENTIALS,
} = require('../utils/constants');

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
    if (err.name === 'ValidationError') {
      next(new BadRequest(err.message));
    } else if (err.code === 11000) {
      next(new Conflict(TXT_ERR_USER_EMAIL_CONFLICT));
    } else {
      next(err);
    }
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
    if (!user) {
      throw new NotFound(TXT_ERR_USER_NOT_FOUND);
    }
    res
      .status(ST_OK)
      .send({ user, message: `${user.name}, Ваши данные обновлены.` });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest(err.message));
    } else if (err.code === 11000) {
      next(new Conflict(TXT_ERR_USER_EMAIL_CONFLICT));
    } else {
      next(err);
    }
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.payload._id);

    if (user === null || !user) {
      throw new NotFound(TXT_ERR_USER_NOT_FOUND);
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
      throw new Error(TXT_ERR_SERV);
    }

    if (!email || !password) {
      throw new BadRequest(TXT_ERR_NO_CREDENTIALS);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || user === null) {
      throw new Unauthorized(TXT_ERR_NO_USER);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Unauthorized(TXT_ERR_NO_CREDENTIALS);
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
    throw new BadRequest(TXT_ERR_BAD_CREDENTIALS);
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  signin,
  signout,
};
