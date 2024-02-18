import { AccountId } from "../../domain/AccountId";
import { AccountRepository } from "../../domain/AccountRepository";
import { Amount } from "../../domain/Amount";
import { AccountNotFoundError } from "../../domain/Error/AccountNotFoundError";

export class MoneyWithdrawer {
  constructor(private repository: AccountRepository) {}

  public async withdraw(id: string, amount: number): Promise<void> {
    const accountId = new AccountId(id);
    const withdrawAmount = new Amount(amount);
    const account = await this.repository.search(accountId);

    if (!account) {
      throw new AccountNotFoundError(id);
    }

    account.withdraw(withdrawAmount);

    this.repository.save(account);
  }
}
