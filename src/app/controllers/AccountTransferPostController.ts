import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MoneyTransferer } from '../../Contexts/Bank/Account/application/Transfer/MoneyTransferer';
import { AccountNotFoundError } from '../../Contexts/Bank/Account/domain/Error/AccountNotFoundError';
import { OverdraftNotAllowedError } from '../../Contexts/Bank/Account/domain/Error/OverdraftNotAllowedError';
import { InvalidArgumentError } from '../../Contexts/Bank/Shared/domain/ValueObject/InvalidArgumentError';
import { Controller } from './Controller';

type TransferMoneyRequest = Request & {
  body: {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
  };
};

export class AccountTransferPostController implements Controller {
  constructor(private readonly moneyTransferer: MoneyTransferer) {}

  async run(req: TransferMoneyRequest, res: Response) {
    try {
      await this.moneyTransferer.transfer(req.body.fromAccountId, req.body.toAccountId, req.body.amount);

      res.status(httpStatus.OK).send();
    } catch (err) {
      if (err instanceof AccountNotFoundError) {
        res.status(httpStatus.NOT_FOUND).json({ error: err.message });
      }

      if (err instanceof InvalidArgumentError || err instanceof OverdraftNotAllowedError) {
        res.status(httpStatus.BAD_REQUEST).json({ error: err.message });
      }
    }
  }
}
