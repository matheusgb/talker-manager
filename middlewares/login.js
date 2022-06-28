const express = require('express');
const randomToken = require('random-token');

const router = express.Router();

const { emailExists, emailIsValid, 
  passwordExists, passwordIsValid } = require('../validations/login');
  
  router.post('/', emailExists, emailIsValid, passwordExists, passwordIsValid, (_req, res) => {
  const token = randomToken(16);

  res.status(200).json({ token });
});

module.exports = router;