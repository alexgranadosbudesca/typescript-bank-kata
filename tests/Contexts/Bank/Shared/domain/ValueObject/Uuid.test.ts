import { InvalidArgumentError } from "../../../../../../src/Contexts/Bank/Shared/domain/ValueObject/InvalidArgumentError";
import { Uuid } from "../../../../../../src/Contexts/Bank/Shared/domain/ValueObject/Uuid";

describe("Uuid", () => {
  it("Builds correctly", async () => {
    const uuid = new Uuid('07a34e74-5b67-4ad3-b72e-0a007a441fa2');

    expect(uuid).toBeInstanceOf(Uuid);
  });

  it("Throws exception on invalid value", async () => {
    expect(async () => {
      new Uuid('1');
    }).rejects.toThrow(InvalidArgumentError);
  });
});
