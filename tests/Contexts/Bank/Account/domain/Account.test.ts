import { Account } from "../../../../../src/Contexts/Bank/Account/domain/Account";
import { AccountCreatedDomainEvent } from "../../../../../src/Contexts/Bank/Account/domain/AccountCreatedDomainEvent";
import { DepositLimitSurpasedError } from "../../../../../src/Contexts/Bank/Account/domain/Error/DepositLimitSurpasedError";
import { OverdraftLimitSurpasedError } from "../../../../../src/Contexts/Bank/Account/domain/Error/OverdraftLimitSurpasedError";
import { OverdraftNotAllowedError } from "../../../../../src/Contexts/Bank/Account/domain/Error/OverdraftNotAllowedError";
import { AccountIdMother } from "./AccountIdMother";
import { AccountMother } from "./AccountMother";
import { AmountMother } from "./AmountMother";
import { StatementMother } from "./StatementMother";
import { TransactionMother } from "./TransactionMother";

describe("Account", () => {
  it("Records domain event on creation", async () => {
    const accountId = AccountIdMother.random();
    const account = Account.create(accountId);

    expect(account.pullDomainEvents()[0]).toBeInstanceOf(
      AccountCreatedDomainEvent,
    );
  });

  it("Deposits an amount", async () => {
    const account = AccountMother.create(
      AccountIdMother.random(),
      StatementMother.create([]),
      AmountMother.create(100),
    );

    account.deposit(AmountMother.create(25));

    expect(account.getBalance().value).toEqual(125);
    expect(account.statement.transactions.at(0)?.amount.value).toBe(25);
  });

  it("Throws exception on deposit limit surpased", async () => {
    expect(async () => {
      const transaction = TransactionMother.withAmount(AmountMother.create(1500));
      const account = AccountMother.create(
        AccountIdMother.random(),
        StatementMother.create([transaction]),
        AmountMother.create(1700)
      )

      account.deposit(AmountMother.create(3501));
    }).rejects.toThrow(DepositLimitSurpasedError);
  });


  it("Withdraws an amount", async () => {
    const account = AccountMother.create(
      AccountIdMother.random(),
      StatementMother.create([]),
      AmountMother.create(100),
    );

    account.withdraw(AmountMother.create(25));

    expect(account.getBalance().value).toEqual(75);
    expect(account.statement.transactions.at(0)?.amount.value).toBe(-25);
  });

  it("Throws exception on overdraft limit surpased", async () => {
    expect(async () => {
      const account = AccountMother.withBalance(AmountMother.create(0));

      account.withdraw(AmountMother.create(201));
    }).rejects.toThrow(OverdraftLimitSurpasedError);
  });

  it("Transfers an amount", async () => {
    const account = AccountMother.create(
      AccountIdMother.random(),
      StatementMother.create([]),
      AmountMother.create(100),
    );

    account.transfer(AmountMother.create(25));

    expect(account.getBalance().value).toEqual(125);
    expect(account.statement.transactions.at(0)?.amount.value).toBe(25);
  });

  it("Throws exception on transfer overdraft", async () => {
    expect(async () => {
      const account = AccountMother.withBalance(AmountMother.create(100));

      account.transfer(AmountMother.create(101).negative());
    }).rejects.toThrow(OverdraftNotAllowedError);
  });
});
