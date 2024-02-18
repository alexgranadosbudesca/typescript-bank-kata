import { NumberValueObject } from '../../Shared/domain/ValueObject/NumberValueObject';

export class Amount extends NumberValueObject {
  public add(amount: Amount): Amount {
    return new Amount(this.value + amount.value);
  }

  public subtract(amount: Amount): Amount {
    return new Amount(this.value - amount.value);
  }

  public isPositive(): boolean {
    return this.value > 0;
  }

  public negative(): Amount {
    return new Amount(-Math.abs(this.value));
  }
}
