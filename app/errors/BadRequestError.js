class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.status = 'Bad Request';
    this.code = 400;
  }
}

module.exports = BadRequestError;
