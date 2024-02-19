import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MoneyDepositor } from '../../../Contexts/Bank/Account/application/Deposit/MoneyDepositor';
import { AccountNotFoundError } from '../../../Contexts/Bank/Account/domain/Error/AccountNotFoundError';
import { DepositLimitSurpasedError } from '../../../Contexts/Bank/Account/domain/Error/DepositLimitSurpasedError';
import { InvalidArgumentError } from '../../../Contexts/Bank/Shared/domain/ValueObject/InvalidArgumentError';
import { Controller } from '../Controller';

type DepositMoneyRequest = Request & {
  body: {
    accountId: string;
    amount: number;
  };
};

export class AccountDepositPostController implements Controller {
  constructor(private readonly moneyDepositor: MoneyDepositor) {}

  async run(req: DepositMoneyRequest, res: Response): Promise<void> {
    try {
      await this.moneyDepositor.deposit(req.body.accountId, req.body.amount);

      res.status(httpStatus.CREATED).send();
    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).json({ error: err.message });
      }

      if (err instanceof AccountNotFoundError) {
        res.status(httpStatus.NOT_FOUND).json({ error: err.message });
      }
 
      if (err instanceof DepositLimitSurpasedError) {
        res.status(httpStatus.CONFLICT).json({ error: err.message });
      }
    }
  }
}
