import { TransactionId } from "../../../../../src/Contexts/Bank/Account/domain/TransactionId";
import { UuidMother } from "../../Shared/domain/ValueObject/UuidMother";

export class TransactionIdMother {
  static create(id: string): TransactionId {
    return new TransactionId(id);
  }

  static random(): TransactionId {
    return this.create(UuidMother.random());
  }
}
