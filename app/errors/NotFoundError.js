class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 'Not Found';
    this.code = 404;
  }
}

module.exports = NotFoundError;
