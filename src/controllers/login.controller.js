const { loginService } = require('../services');

const AuthorizationToken = async (req, res) => {
  
  const response = await loginService.AuthorizationToken(req.body);

};

module.exports = {
  AuthorizationToken,
}