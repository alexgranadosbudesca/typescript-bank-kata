import { Given } from '@cucumber/cucumber';
import { Account } from '../../../../src/Contexts/Bank/Account/domain/Account';
import { AccountId } from '../../../../src/Contexts/Bank/Account/domain/AccountId';
import { AccountRepository } from '../../../../src/Contexts/Bank/Account/domain/AccountRepository';
import container from '../../../../src/app/dependency-injection';

const accountRepository: AccountRepository = container.get(
  "Bank.Account.domain.AccountRepository"
);

Given("there is an account with ID {string}", async (accountId: string) => {
  await accountRepository.save(
    Account.create(new AccountId(accountId))
  );
});
