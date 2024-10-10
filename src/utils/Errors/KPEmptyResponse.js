export default class KPEmptyResponse extends Error {
  constructor() {
    super();
    this.name = 'EmptyResponse';
    this.errorObj = {
      error: 'Empty Response',
      statusCode: 404,
      message: 'Requested string not found',
    };
  }
}
