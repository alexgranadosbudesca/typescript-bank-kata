import { ValueObject } from "../../../../../../src/Contexts/Bank/Shared/domain/ValueObject/ValueObject";

class TestValueObject extends ValueObject<string> {}

describe("ValueObject", () => {
  it("compares if its bigger than correctly", async () => {
    const valueObject = new TestValueObject('paco');
    const valueObjectTwo = new TestValueObject('paco');

    expect(valueObjectTwo.equals(valueObject)).toBe(true);
  });
});

