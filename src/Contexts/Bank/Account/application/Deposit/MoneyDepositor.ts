import { AccountId } from "../../domain/AccountId";
import { AccountRepository } from "../../domain/AccountRepository";
import { Amount } from "../../domain/Amount";
import { AccountNotFoundError } from "../../domain/Error/AccountNotFoundError";

export class MoneyDepositor {
  constructor (private repository: AccountRepository) {}

  public async deposit(id: string, amount: number): Promise<void> {
    const accountId = new AccountId(id);
    const depositAmount = new Amount(amount);
    const account = await this.repository.search(accountId);

    if (!account) {
      throw new AccountNotFoundError(id);
    }

    account.deposit(depositAmount);

    this.repository.save(account);
  }
}
