const { NOT_FOUND_ROUTE_MESSAGE } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

const notFoundController = (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ROUTE_MESSAGE));
};

module.exports = notFoundController;
