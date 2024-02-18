export class AccountNotFoundError extends Error {
  constructor(id: string) {
    super(`Account with Id ${id} not found.`);
  }
}
