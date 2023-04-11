const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET || 'mySecret';

// Objeto de configuração adicional

// const jwtConfig = {
//   expiresIn: '15d', // expiração determinada
//   algorithm: 'HS256' // Algoritmo utilizado para encodar
// }

const generateToken = (payload) => jwt.sign(payload, TOKEN_SECRET);

// const authenticateToken = async (req, res) => {
//   const token = req.headers.authorization;

//   const
};