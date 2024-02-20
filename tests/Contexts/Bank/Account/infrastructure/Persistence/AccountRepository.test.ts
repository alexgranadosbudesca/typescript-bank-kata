import container from "../../../../../../src/app/dependency-injection";
import { AccountRepository } from "../../../../../../src/Contexts/Bank/Account/domain/AccountRepository";
import { EnvironmentArranger } from "../../../Shared/infrastructure/EnvironmentArranger";
import { AccountIdMother } from "../../domain/AccountIdMother";
import { AccountMother } from "../../domain/AccountMother";

const environmentArranger: Promise<EnvironmentArranger> = container.get(
  "App.EnvironmentArranger"
);
const repository: AccountRepository = container.get(
  "Bank.Account.domain.AccountRepository"
);

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe("AccountRepository", () => {
  describe("#search", () => {
    it("should return an existing account", async () => {
      const expectedAccount = AccountMother.random();
      await repository.save(expectedAccount);

      const account = await repository.search(expectedAccount.id);

      expect(expectedAccount).toEqual(account);
    });

    it("should not return null if there is no account", async () => {
      expect(await repository.search(AccountIdMother.random())).toBeFalsy();
    });
  });

  describe("#save", () => {
    it("should save an account", async () => {
      const expectedAccount = AccountMother.random();

      await repository.save(expectedAccount);

      const account = await repository.search(expectedAccount.id);

      expect(expectedAccount).toEqual(account);
    });
  });
});
