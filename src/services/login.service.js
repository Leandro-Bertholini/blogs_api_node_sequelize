const { User } = require('../models');

const AuthorizationToken = async ({email, password}) => {

  if (!email || !password) return 'Some required fields are missing';

  const user = await User.findOne({
    attributes: [id, email],
    where: { email, password }
  });

  if (!user) return 'Invalid fields';

  const { id, email } = user;
  const token = generateToken({id, email});

  return { token };
};

module.exports = AuthorizationToken;