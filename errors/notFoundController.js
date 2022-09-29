const { NOT_FOUND_ROUTE_MESSAGE } = require('../utils/constants');
const NotFoundError = require('./NotFoundError');

module.exports.notFoundController = (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ROUTE_MESSAGE));
};
