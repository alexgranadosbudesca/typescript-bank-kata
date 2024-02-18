import { Request, Response } from "express";
import httpStatus from "http-status";
import { MoneyWithdrawer } from "../../Contexts/Bank/Account/application/Withdrawal/MoneyWithdrawer";
import { AccountNotFoundError } from "../../Contexts/Bank/Account/domain/Error/AccountNotFoundError";
import { OverdraftLimitSurpasedError } from "../../Contexts/Bank/Account/domain/Error/OverdraftLimitSurpasedError";
import { InvalidArgumentError } from "../../Contexts/Bank/Shared/domain/ValueObject/InvalidArgumentError";
import { Controller } from "./Controller";

type WitdrawMoneyRequest = Request & {
  body: {
    accountId: string;
    amount: number;
  };
};

export class AccountWithdrawPostController implements Controller {
  constructor(private readonly moneyWithdrawer: MoneyWithdrawer) {}

  async run(req: WitdrawMoneyRequest, res: Response) {
    try {
      await this.moneyWithdrawer.withdraw(req.body.accountId, req.body.amount);

      res.status(httpStatus.OK).send();
    } catch (err) {
      if (err instanceof AccountNotFoundError) {
        res.status(httpStatus.NOT_FOUND).json({ error: err.message });
      }

      if (
        err instanceof InvalidArgumentError ||
        err instanceof OverdraftLimitSurpasedError
      ) {
        res.status(httpStatus.BAD_REQUEST).json({ error: err.message });
      }
    }
  }
}
