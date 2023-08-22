const router = require('express').Router();
const { createUser, signout, signin } = require('../controllers/users');
const {
  signinValidation,
  signupValidation,
} = require('../middlewares/validations');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, signin);
router.post('/signout', signout);

module.exports = router;
