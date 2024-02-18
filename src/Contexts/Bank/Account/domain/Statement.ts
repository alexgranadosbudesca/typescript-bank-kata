import { Amount } from "./Amount";
import { Transaction } from "./Transaction";

export class Statement {
  constructor(readonly transactions: Array<Transaction>) {}

  public register(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  public sumDepositsByDate(date: Date): Amount {
    let amount = new Amount(0);
    let deposits = this.transactions.filter((transaction: Transaction) => transaction.date.getDate() == date.getDate());
    deposits = this.transactions.filter((transaction: Transaction) => transaction.amount.isPositive());

    deposits.forEach((transaction: Transaction) => {
        amount = amount.add(transaction.amount);
    });

    return amount;
  }
}
