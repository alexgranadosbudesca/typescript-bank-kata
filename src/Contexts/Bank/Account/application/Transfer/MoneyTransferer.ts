import { AccountId } from "../../domain/AccountId";
import { AccountRepository } from "../../domain/AccountRepository";
import { Amount } from "../../domain/Amount";
import { AccountNotFoundError } from "../../domain/Error/AccountNotFoundError";

export class MoneyTransferer {
  constructor(private repository: AccountRepository) {}

  public async transfer(
    fromId: string,
    toId: string,
    amount: number
  ): Promise<void> {
    const fromAccountId = new AccountId(fromId);
    const toAccountId = new AccountId(toId);
    const transferAmount = new Amount(amount);
    const fromAccount = await this.repository.search(fromAccountId);
    const toAccount = await this.repository.search(toAccountId);

    if (!fromAccount) {
      throw new AccountNotFoundError(fromId);
    }

    if (!toAccount) {
      throw new AccountNotFoundError(toId);
    }

    fromAccount.transfer(transferAmount.negative());
    toAccount.transfer(transferAmount);

    this.repository.save(fromAccount);
    this.repository.save(toAccount);
  }
}
