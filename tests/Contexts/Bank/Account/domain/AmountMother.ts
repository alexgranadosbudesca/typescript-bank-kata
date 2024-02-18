import { faker } from "@faker-js/faker";
import { Amount } from "../../../../../src/Contexts/Bank/Account/domain/Amount";

export class AmountMother {
  static create(amount: number): Amount {
    return new Amount(amount);
  }

  static random(): Amount {
    return this.create(faker.number.float(100));
  }
}
