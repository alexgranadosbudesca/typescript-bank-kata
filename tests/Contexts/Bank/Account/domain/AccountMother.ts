import { Account } from "../../../../../src/Contexts/Bank/Account/domain/Account";
import { AccountId } from "../../../../../src/Contexts/Bank/Account/domain/AccountId";
import { Amount } from "../../../../../src/Contexts/Bank/Account/domain/Amount";
import { Statement } from "../../../../../src/Contexts/Bank/Account/domain/Statement";
import { AccountIdMother } from "./AccountIdMother";
import { AmountMother } from "./AmountMother";
import { StatementMother } from "./StatementMother";

export class AccountMother {
  static create(id: AccountId, statement: Statement, balance: Amount): Account {
    return new Account(id, statement, balance);
  }

  static withId(id: AccountId): Account {
    return this.create(
      id,
      StatementMother.random(),
      AmountMother.random()
    );
  }

  static random(): Account {
    return this.create(
      AccountIdMother.random(),
      StatementMother.random(),
      AmountMother.random()
    );
  }
}
