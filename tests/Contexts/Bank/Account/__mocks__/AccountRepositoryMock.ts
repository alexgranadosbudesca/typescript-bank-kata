import { Account } from "../../../../../src/Contexts/Bank/Account/domain/Account";
import { AccountId } from "../../../../../src/Contexts/Bank/Account/domain/AccountId";
import { AccountRepository } from "../../../../../src/Contexts/Bank/Account/domain/AccountRepository";
import { Nullable } from "../../../../../src/Contexts/Bank/Shared/domain/Nullable";

export class AccountRepositoryMock implements AccountRepository {
  private mockSave = jest.fn();
  private accounts: Array<Account> = [];

  async search(accountId: AccountId): Promise<Nullable<Account>> {
    return this.accounts.find((e) => e.id.equals(accountId));
  }

  async save(account: Account): Promise<void> {
    account.pullDomainEvents();
    this.mockSave(account);
    this.accounts.push(account);
  }

  assertSaveHasBeenCalledWith(account: Account) {
    expect(this.mockSave).toHaveBeenCalledWith(account);
  }
}
