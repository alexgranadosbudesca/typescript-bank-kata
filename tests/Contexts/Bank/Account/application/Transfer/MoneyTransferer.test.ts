import { MoneyTransferer } from "../../../../../../src/Contexts/Bank/Account/application/Transfer/MoneyTransferer";
import { AccountNotFoundError } from "../../../../../../src/Contexts/Bank/Account/domain/Error/AccountNotFoundError";
import { AccountRepositoryMock } from "../../__mocks__/AccountRepositoryMock";
import { AccountIdMother } from "../../domain/AccountIdMother";
import { AccountMother } from "../../domain/AccountMother";
import { AmountMother } from "../../domain/AmountMother";
import { StatementMother } from "../../domain/StatementMother";
import { TransactionIdMother } from "../../domain/TransactionIdMother";
import { TransactionMother } from "../../domain/TransactionMother";

describe("MoneyTransferer", () => {
  it("Transfers money into from an account to another", async () => {
    const fromId = AccountIdMother.random();
    const toId = AccountIdMother.random();
    const amount = AmountMother.create(100);
    const fromAccount = AccountMother.create(
      fromId,
      StatementMother.create([
        TransactionMother.create(
          TransactionIdMother.random(),
          amount,
          new Date()
        ),
      ]),
      AmountMother.create(1000)
    );
    const toAccount = AccountMother.create(
      toId,
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
    const applicationService = new MoneyTransferer(repository);

    repository.save(fromAccount);
    repository.save(toAccount);

    await applicationService.transfer(fromId.value, toId.value, amount.value);

    repository.assertSaveHasBeenCalledWith(fromAccount);
    repository.assertSaveHasBeenCalledWith(toAccount);
  });

  it("Throws error on from account not found", async () => {
    expect(async () => {
      const fromId = AccountIdMother.random();
      const toId = AccountIdMother.random();
      const amount = AmountMother.random();
      const repository = new AccountRepositoryMock();
      const applicationService = new MoneyTransferer(repository);

      await applicationService.transfer(fromId.value, toId.value, amount.value);
    }).rejects.toThrow(AccountNotFoundError);
  });

  it("Throws error on to account not found", async () => {
    expect(async () => {
      const fromId = AccountIdMother.random();
      const toId = AccountIdMother.random();
      const amount = AmountMother.random();
      const fromAccount = AccountMother.withId(fromId);
      const repository = new AccountRepositoryMock();
      const applicationService = new MoneyTransferer(repository);

      repository.save(fromAccount);

      await applicationService.transfer(fromId.value, toId.value, amount.value);
    }).rejects.toThrow(AccountNotFoundError);
  });
});
