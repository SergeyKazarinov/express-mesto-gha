class NotFoundRouteError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundRouteError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundRouteError;
