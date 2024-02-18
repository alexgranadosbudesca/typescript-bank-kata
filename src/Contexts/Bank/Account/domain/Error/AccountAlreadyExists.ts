export class AccountAlreadyExistsError extends Error {
  constructor(id: string) {
    super(`Account with Id ${id} already exists.`);
  }
}
