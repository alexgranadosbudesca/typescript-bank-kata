import { Statement } from "../../../../../src/Contexts/Bank/Account/domain/Statement";
import { Transaction } from "../../../../../src/Contexts/Bank/Account/domain/Transaction";
import { TransactionMother } from "./TransactionMother";

export class StatementMother {
  static create(transactions: Array<Transaction>): Statement {
    return new Statement(transactions);
  }

  static random(): Statement {
    return this.create([
      TransactionMother.random(),
      TransactionMother.random(),
      TransactionMother.random(),
    ]);
  }
}
