const validator = require('validator');
const Movie = require('../models/movie');
const { ST_OK } = require('../utils/constants');
const { Forbidden, NotFound, BadRequest } = require('../utils/errors');

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
    next(err);
  }
};

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    if (movies.length === 0) {
      throw new NotFound('Cписок фильмов пуст');
    }
    res
      .status(ST_OK)
      .send({ ...movies, message: `Список фильмов: ${movies.length}` });
  } catch (err) {
    next(err);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest('Формат ID неверный');
    }
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (movie == null || !movie) {
      throw new NotFound('Фильма с таким ID не найдена');
    }
    if (!movie.owner.equals(req.user.payload._id)) {
      throw new Forbidden('Удаление чужих фильмов- запрещено.');
    }
    res
      .status(ST_OK)
      .send({ message: `Фильм "${movie.nameRU}" удален из избранного` });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMovies, postMovie, deleteMovieById };
