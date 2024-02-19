import { AccountId } from "../../../../../src/Contexts/Bank/Account/domain/AccountId";
import { UuidMother } from "../../Shared/domain/ValueObject/UuidMother";

export class AccountIdMother {
  static create(id: string): AccountId {
    return new AccountId(id);
  }

  static random(): AccountId {
    return this.create(UuidMother.random());
  }
}
