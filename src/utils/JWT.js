const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET || 'mySecret';

// Objeto de configuração adicional => config do JWT

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256' // Algoritmo utilizado para encodar
}

const generateToken = (payload) => jwt.sign(payload, TOKEN_SECRET, jwtConfig);

const authenticateToken = async (token) => {
  // const TOKEN = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found'});
  };

  try{
    const decodedToken = await jwt.verify(token, TOKEN_SECRET);
    return decodedToken;
  } catch(err) {

    const error = new Error(error.status(401)
      .json({ message: 'Expired or invalid token' }));

    return error;
  }
};

module.exports = {
  generateToken,
  authenticateToken
};