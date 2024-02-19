import { Amount } from "../../../../../src/Contexts/Bank/Account/domain/Amount";

describe("Amount", () => {
  it("adds an amount correctly", async () => {
    const amount = new Amount(50);
    const amountToSubtract = new Amount(15);

    const result = amount.add(amountToSubtract);

    expect(result.value).toBe(65);
  });

  it("subtracts an amount correctly", async () => {
    const amount = new Amount(50);
    const amountToSubtract = new Amount(15);

    const result = amount.subtract(amountToSubtract);

    expect(result.value).toBe(35);
  });

  it("checks if it's positive correctly", async () => {
    const amount = new Amount(50);

    expect(amount.isPositive()).toBe(true);
  });

  it("sets the amount to negative", async () => {
    const amount = new Amount(50);

    const result = amount.negative();

    expect(result.value).toBe(-50);
  });
});
