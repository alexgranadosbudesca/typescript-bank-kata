export class OverdraftNotAllowedError extends Error {
  constructor() {
    super('Overdraft is not allowed in transfers.');
  }
}
