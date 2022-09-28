class NotRightError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotRightError';
    this.statusCode = 401;
  }
}

module.exports = NotRightError;
