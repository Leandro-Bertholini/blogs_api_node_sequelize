const { loginService } = require('../services');

const authorizationToken = async (req, res) => {
  
  const response = await loginService.authorizationToken(req.body);

  if (response === 'Some required fields are missing') {
    return res.status(400).json({ message: response })
  };

  if (response === 'Invalid fields') {
    return res.status(400).json({ message: response })
  };

  return res.status(200).json(response);

};

module.exports = { authorizationToken };