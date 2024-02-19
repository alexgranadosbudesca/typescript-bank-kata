import { faker } from "@faker-js/faker";
import { Amount } from "../../../../../src/Contexts/Bank/Account/domain/Amount";
import { Transaction } from "../../../../../src/Contexts/Bank/Account/domain/Transaction";
import { TransactionId } from "../../../../../src/Contexts/Bank/Account/domain/TransactionId";
import { AmountMother } from "./AmountMother";
import { TransactionIdMother } from "./TransactionIdMother";

export class TransactionMother {
  static create(id: TransactionId, amount: Amount, date: Date): Transaction {
    return new Transaction(id, amount, date);
  }

  static withAmount(amount: Amount): Transaction {
    return this.create(
      TransactionIdMother.random(),
      amount,
      faker.date.anytime(),
    );
  }

  static random(): Transaction {
    return this.create(
      TransactionIdMother.random(),
      AmountMother.random(),
      faker.date.anytime(),
    );
  }
}
