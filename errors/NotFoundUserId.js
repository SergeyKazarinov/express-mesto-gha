class NotFoundUserId extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundUserId';
    this.statusCode = 404;
  }
}

module.exports = NotFoundUserId;
