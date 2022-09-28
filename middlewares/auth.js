const jwt = require('jsonwebtoken');
const NotRegisteredError = require('../errors/NotRegisteredError');
const { NOT_REGISTERED_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.startsWith('Bearer ')) {
    next(new NotRegisteredError(NOT_REGISTERED_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'jwt-token');
  } catch (err) {
    next(new NotRegisteredError(NOT_REGISTERED_MESSAGE));
  }
  req.user = payload;
  return next();
};
