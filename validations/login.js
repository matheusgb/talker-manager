const emailExists = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  next();
};

const emailIsValid = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordExists = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  next();
};

const passwordIsValid = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { emailExists, emailIsValid, passwordExists, passwordIsValid };