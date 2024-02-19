import { Statement } from "../../../../../src/Contexts/Bank/Account/domain/Statement";
import { AmountMother } from "./AmountMother";
import { TransactionIdMother } from "./TransactionIdMother";
import { TransactionMother } from "./TransactionMother";

describe("Statement", () => {
  it("Registers a transaction", async () => {
    const transaction = TransactionMother.random();
    const statement = new Statement([]);

    statement.register(transaction);

    expect(statement.transactions.at(0)).toBe(transaction);
  });

  it("Sums deposits by date properly", async () => {
    const transactionOne = TransactionMother.create(
      TransactionIdMother.random(),
      AmountMother.create(-50),
      new Date()
    );
    const transactionTwo = TransactionMother.create(
      TransactionIdMother.random(),
      AmountMother.create(125),
      new Date(),
    );
    const transactionThree = TransactionMother.create(
      TransactionIdMother.random(),
      AmountMother.create(169),
      new Date(),
    );

    const statement = new Statement([transactionOne, transactionTwo, transactionThree]);


    expect(statement.sumDepositsByDate(new Date()).value).toBe(294);
  });
});
