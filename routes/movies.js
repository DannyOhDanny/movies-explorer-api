const router = require('express').Router();
const {
  getMovies,
  postMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { idValidation, movieValidation } = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', movieValidation, postMovie);
router.delete('/:id', idValidation, deleteMovieById);

module.exports = router;
