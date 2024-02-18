export class DepositLimitSurpasedError extends Error {
  constructor (depositLimit: number) {
    super(`Daily deposit limit of ${depositLimit}$ surpased.`);
  }
}
