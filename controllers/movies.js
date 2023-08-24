const validator = require('validator');
const Movie = require('../models/movie');
const { Forbidden } = require('../errors/ERR_FORBIDDEN');
const { BadRequest } = require('../errors/ERR_BAD_REQUEST');
const { NotFound } = require('../errors/ERR_NOT_FOUND');
const { Conflict } = require('../errors/ERR_CONFLICT');
const {
  ST_OK,
  TXT_ERR_BAD_MOVIE_DATA,
  TXT_ERR_ID_DUPLICATE,
  TXT_ERR_ID_FORMAT_INVALID,
  TXT_ERR_ID_NULL,
  TXT_ERR_ID_FORBIDDEN,
} = require('../utils/constants');

const postMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      description,
      year,
      image,
      thumbnail,
      trailerLink,
      owner: req.user.payload._id,
      movieId,
      nameRU,
      nameEN,
    });

    res.status(ST_OK).send({
      movie,
      message: `Фильм '${movie.nameRU}' успешно добавлен в избранное`,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest([TXT_ERR_BAD_MOVIE_DATA, err.message]));
    } else if (err.name === 'MongoServerError') {
      next(new Conflict([TXT_ERR_ID_DUPLICATE, err.message]));
    } else {
      next(err);
    }
  }
};

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user.payload._id });

    res
      .status(ST_OK)
      .send({ movies, message: `Список ваших фильмов: ${movies.length}` });
  } catch (err) {
    next(err);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest(TXT_ERR_ID_FORMAT_INVALID);
    }
    const movie = await Movie.findById(req.params.id);
    if (movie == null || !movie) {
      throw new NotFound(TXT_ERR_ID_NULL);
    }
    if (!movie.owner.equals(req.user.payload._id)) {
      throw new Forbidden(TXT_ERR_ID_FORBIDDEN);
    }

    await movie.deleteOne({});

    res
      .status(ST_OK)
      .send({ message: `Фильм ${movie.nameRU} удален из избранного` });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(TXT_ERR_ID_NULL));
    } else {
      next(err);
    }
  }
};

module.exports = { getMovies, postMovie, deleteMovieById };
