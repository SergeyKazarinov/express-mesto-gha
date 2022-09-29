const { NOT_FOUND_ROUTE_MESSAGE } = require('../utils/constants');
const NotFoundRouteError = require('./NotFoundRouteError');

module.exports.notFoundController = (req, res, next) => {
  next(new NotFoundRouteError(NOT_FOUND_ROUTE_MESSAGE));
};
