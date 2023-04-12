const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET || 'mySecret';

// Objeto de configuração adicional => config do JWT

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256', // Algoritmo utilizado para encodar
};

const generateToken = (payload) => jwt.sign(payload, TOKEN_SECRET, jwtConfig);

const authenticateToken = async (req, res, next) => {
  const TOKEN = req.headers.authorization;

  if (!TOKEN) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  try {
    const decryptToken = jwt.verify(TOKEN, TOKEN_SECRET);
    res.locals.user = decryptToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  } 
};

module.exports = {
  generateToken,
  authenticateToken,
};