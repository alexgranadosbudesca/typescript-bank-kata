import { AccountCreator } from "../../../../../../src/Contexts/Bank/Account/application/Create/AccountCreator";
import { AccountAlreadyExistsError } from "../../../../../../src/Contexts/Bank/Account/domain/Error/AccountAlreadyExists";
import { AccountRepositoryMock } from "../../__mocks__/AccountRepositoryMock";
import { AccountIdMother } from "../../domain/AccountIdMother";
import { AccountMother } from "../../domain/AccountMother";
import { AmountMother } from "../../domain/AmountMother";
import { StatementMother } from "../../domain/StatementMother";

describe("MoneyDepositor", () => {
  it("Deposits money into an account", async () => {
    const accountId = AccountIdMother.random();
    const account = AccountMother.create(
      accountId,
      StatementMother.create([]),
      AmountMother.create(0)
    );
    const repository = new AccountRepositoryMock();
    const applicationService = new AccountCreator(repository);

    repository.save(account);

    await applicationService.create(accountId.value);

    repository.assertSaveHasBeenCalledWith(account);
  });

  it("Throws error on account already exists", async () => {
    expect(async () => {
      const accountId = AccountIdMother.random();
      const account = AccountMother.withId(accountId);
      const repository = new AccountRepositoryMock();
      const applicationService = new AccountCreator(repository);

      repository.save(account);

      await applicationService.create(accountId.value);
    }).rejects.toThrow(AccountAlreadyExistsError);
  });
});
