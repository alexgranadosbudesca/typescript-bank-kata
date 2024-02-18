import { MoneyWithdrawer } from "../../../../../../src/Contexts/Bank/Account/application/Withdrawal/MoneyWithdrawer";
import { AccountNotFoundError } from "../../../../../../src/Contexts/Bank/Account/domain/Error/AccountNotFoundError";
import { AccountRepositoryMock } from "../../__mocks__/AccountRepositoryMock";
import { AccountIdMother } from "../../domain/AccountIdMother";
import { AccountMother } from "../../domain/AccountMother";
import { AmountMother } from "../../domain/AmountMother";
import { StatementMother } from "../../domain/StatementMother";
import { TransactionIdMother } from "../../domain/TransactionIdMother";
import { TransactionMother } from "../../domain/TransactionMother";

describe("MoneyWithdrawer", () => {
  it("Withdraws money from an account", async () => {
    const accountId = AccountIdMother.random();
    const amount = AmountMother.create(100);
    const account = AccountMother.create(
      accountId,
      StatementMother.create([
        TransactionMother.create(
          TransactionIdMother.random(),
          amount.negative(),
          new Date()
        ),
      ]),
      AmountMother.random()
    );
    const repository = new AccountRepositoryMock();
    const applicationService = new MoneyWithdrawer(repository);

    repository.save(account);

    await applicationService.withdraw(accountId.value, amount.value);

    repository.assertSaveHasBeenCalledWith(account);
  });

  it("Throws error on account not found", async () => {
    expect(async () => {
      const accountId = AccountIdMother.random();
      const amount = AmountMother.random();
      const repository = new AccountRepositoryMock();
      const applicationService = new MoneyWithdrawer(repository);

      await applicationService.withdraw(accountId.value, amount.value);
    }).rejects.toThrow(AccountNotFoundError);
  });
});
