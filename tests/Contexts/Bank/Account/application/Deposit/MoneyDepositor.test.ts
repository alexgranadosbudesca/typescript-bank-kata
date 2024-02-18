import { MoneyDepositor } from "../../../../../../src/Contexts/Bank/Account/application/Deposit/MoneyDepositor";
import { AccountNotFoundError } from "../../../../../../src/Contexts/Bank/Account/domain/Error/AccountNotFoundError";
import { AccountRepositoryMock } from "../../__mocks__/AccountRepositoryMock";
import { AccountIdMother } from "../../domain/AccountIdMother";
import { AccountMother } from "../../domain/AccountMother";
import { AmountMother } from "../../domain/AmountMother";
import { StatementMother } from "../../domain/StatementMother";
import { TransactionIdMother } from "../../domain/TransactionIdMother";
import { TransactionMother } from "../../domain/TransactionMother";

describe("MoneyDepositor", () => {
  it("Deposits money into an account", async () => {
    const accountId = AccountIdMother.random();
    const amount = AmountMother.random();
    const account = AccountMother.create(
      accountId,
      StatementMother.create([
        TransactionMother.create(
          TransactionIdMother.random(),
          amount,
          new Date()
        ),
      ]),
      AmountMother.random()
    );
    const repository = new AccountRepositoryMock();
    const applicationService = new MoneyDepositor(repository);

    repository.save(account);

    await applicationService.deposit(accountId.value, amount.value);

    repository.assertSaveHasBeenCalledWith(account);
  });

  it("Throws error on account not found", async () => {
    expect(async () => {
      const accountId = AccountIdMother.random();
      const amount = AmountMother.random();
      const repository = new AccountRepositoryMock();
      const applicationService = new MoneyDepositor(repository);

      await applicationService.deposit(accountId.value, amount.value);
    }).rejects.toThrow(AccountNotFoundError);
  });
});
