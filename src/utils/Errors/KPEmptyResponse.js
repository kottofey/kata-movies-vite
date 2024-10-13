export default class KPEmptyResponse extends Error {
  constructor() {
    super();
    this.name = 'EmptyResponse';
    this.error = 'Ошибка поиска';
    this.statusCode = 404;
    this.message =
      'Кинопоиск вернул... ничего. Попробуйте переформулировать запрос.';
  }
}
