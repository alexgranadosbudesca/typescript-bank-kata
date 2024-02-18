export class OverdraftLimitSurpasedError extends Error {
  constructor(overdraftLimit: number) {
    super(`Overdraft of ${overdraftLimit}$ surpased.`);
  }
}
