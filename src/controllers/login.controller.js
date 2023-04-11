const { loginService } = require('../services');

const AuthorizationToken = async (req, res) => {
  
  const response = await loginService.AuthorizationToken(req.body);

  if (response === 'Some required fields are missing') {
    return res.status(400).json({ message: response })
  };

  if (response === 'Invalid fields') {
    return res.status(400).json({ message: response })
  };

  return res.status(200).json(response);

};

module.exports = AuthorizationToken;