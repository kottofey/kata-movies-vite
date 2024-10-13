export default class NoInternetError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TeapotError';

    this.error = this.name;
    this.statusCode = 418;
    this.message = message;
  }
}
