import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { AccountCreatedDomainEvent } from "./AccountCreatedDomainEvent";
import { AccountId } from "./AccountId";
import { Amount } from "./Amount";
import { DepositLimitSurpasedError } from "./Error/DepositLimitSurpasedError";
import { OverdraftLimitSurpasedError } from "./Error/OverdraftLimitSurpasedError";
import { OverdraftNotAllowedError } from "./Error/OverdraftNotAllowedError";
import { Statement } from "./Statement";
import { Transaction } from "./Transaction";
import { TransactionId } from "./TransactionId";

export class Account extends AggregateRoot {
  static readonly OVERDRAFT_LIMIT = -200;
  static readonly DAILY_DEPOSIT_LIMIT = 5000;

  constructor(
    readonly id: AccountId,
    readonly statement: Statement,
    private balance: Amount
  ) {
    super();
  }

  public static create(id: AccountId): Account {
    const account = new Account(id, new Statement([]), new Amount(0));

    account.record(
      new AccountCreatedDomainEvent({
        aggregateId: account.id.value,
      })
    );

    return account;
  }

  public deposit(amount: Amount): void {
    const date = new Date();
    const dailyDeposits = this.statement.sumDepositsByDate(date);

    if (dailyDeposits.add(amount).value > Account.DAILY_DEPOSIT_LIMIT) {
      throw new DepositLimitSurpasedError(Account.DAILY_DEPOSIT_LIMIT);
    }

    this.registerTransaction(amount, date);
  }

  public withdraw(amount: Amount): void {
    const negativeAmount = amount.negative();
    const balanceAfterTransaction = this.balance.add(negativeAmount);

    if (balanceAfterTransaction.value < Account.OVERDRAFT_LIMIT) {
      throw new OverdraftLimitSurpasedError(Account.OVERDRAFT_LIMIT);
    }

    this.registerTransaction(negativeAmount, new Date());
  }

  public transfer(amount: Amount): void {
    if (amount.value < 0 && this.balance.add(amount).value < 0) {
      throw new OverdraftNotAllowedError();
    }

    this.registerTransaction(amount, new Date());
  }

  private registerTransaction(amount: Amount, date: Date): void {
    const transaction = Transaction.create(amount, date);

    this.statement.register(transaction);

    this.balance = this.balance.add(amount);
  }

  static fromPrimitives(plainData: {
    id: string;
    transactions: string;
    balance: number;
  }): Account {
    const transactions = JSON.parse(plainData.transactions);
    const statement = new Statement([]);
    transactions.forEach(
      (transaction: {
        id: { value: string };
        amount: { value: number };
        date: string | number | Date;
      }) =>
        statement.register(
          new Transaction(
            new TransactionId(transaction.id.value),
            new Amount(transaction.amount.value),
            new Date(transaction.date)
          )
        )
    );

    return new Account(
      new AccountId(plainData.id),
      statement,
      new Amount(plainData.balance)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      statement: JSON.stringify(this.statement.transactions),
      balance: this.balance.value,
    };
  }
}
