export default class KpAPIError extends Error {
  constructor(message, kpErrorResponse) {
    super(message);
    this.name = message;
    this.errorObj = JSON.parse(kpErrorResponse);
  }
}
