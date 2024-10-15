export default class KpAPIError extends Error {
  constructor(message, kpErrorResponse) {
    super(message);
    const kpResponse = JSON.parse(kpErrorResponse);

    this.name = message;
    this.error = kpResponse.error || kpResponse.message;
    this.statusCode = kpResponse.statusCode;
    this.message = kpResponse.message;
  }
}
