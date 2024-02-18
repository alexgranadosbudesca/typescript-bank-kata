import { Account } from '../../domain/Account';
import { AccountId } from '../../domain/AccountId';
import { AccountRepository } from '../../domain/AccountRepository';
import { AccountAlreadyExistsError } from '../../domain/Error/AccountAlreadyExists';

export class AccountCreator {
  constructor(private repository: AccountRepository) {}

  public async create(id: string): Promise<void> {
    const accountId = new AccountId(id);

    if (this.repository.search(accountId) instanceof Account) {
      throw new AccountAlreadyExistsError(accountId.value);
    }

    const account = Account.create(accountId);

    this.repository.save(account);
  }
}
