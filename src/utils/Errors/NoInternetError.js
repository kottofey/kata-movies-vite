export default class NoInternetError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TeapotError';
    this.errorObj = {
      error: this.name,
      statusCode: 418,
      message,
    };
  }
}
