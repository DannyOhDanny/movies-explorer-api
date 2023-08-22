const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRouter = require('./auths');
const { auth } = require('../middlewares/auth');
const { error404 } = require('../utils/handleErrors');

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('/*', error404);

module.exports = router;
