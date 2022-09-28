class NotRegisteredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotRegisteredError';
    this.statusCode = 401;
  }
}

module.exports = NotRegisteredError;
