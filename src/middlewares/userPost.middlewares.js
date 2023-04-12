const { User } = require('../models');

const validateName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validatedEmail = /\S+@\S+\.\S+/i.test(email);
  if (!validatedEmail) {
    return res.status(400)
      .json({ message: '"email" must be a valid email' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

const checkExistingEmail = async (req, res, next) => {
  const { email } = req.body;
  const checkEmail = await User.findAll();
  const hasEmail = checkEmail.some((Object) => Object.email === email);
  if (hasEmail) {
    return res.status(409)
      .json({ message: 'User already registered' });
  }
  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  checkExistingEmail,
};