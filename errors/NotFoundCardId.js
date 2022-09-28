class NotFoundCardId extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundCardId';
    this.statusCode = 404;
  }
}

module.exports = NotFoundCardId;
