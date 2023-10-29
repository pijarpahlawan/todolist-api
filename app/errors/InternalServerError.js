class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.status = 'Internal Server Error';
    this.code = 500;
  }
}

module.exports = InternalServerError;
