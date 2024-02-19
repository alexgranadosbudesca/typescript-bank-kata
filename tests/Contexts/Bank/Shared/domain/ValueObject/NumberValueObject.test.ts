import { NumberValueObject } from "../../../../../../src/Contexts/Bank/Shared/domain/ValueObject/NumberValueObject";

class TestNumber extends NumberValueObject {}

describe("NumberValueObject", () => {
  it("compares if its bigger than correctly", async () => {
    const number = new TestNumber(20);
    const numberBiggerThan = new TestNumber(21);

    expect(numberBiggerThan.isBiggerThan(number)).toBe(true);
  });
});
