import { Uuid } from '../../Shared/domain/ValueObject/Uuid';
import { Amount } from './Amount';
import { TransactionId } from './TransactionId';

export class Transaction {
  constructor(
    readonly id: TransactionId,
    readonly amount: Amount,
    readonly date: Date,
  ) {}

  public static create(amount: Amount, date: Date): Transaction {
    return new Transaction(Uuid.random(), amount, date);
  }
}
