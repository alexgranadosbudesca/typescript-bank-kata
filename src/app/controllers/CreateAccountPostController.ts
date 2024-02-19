import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AccountCreator } from '../../Contexts/Bank/Account/application/Create/AccountCreator';
import { AccountAlreadyExistsError } from '../../Contexts/Bank/Account/domain/Error/AccountAlreadyExists';
import { InvalidArgumentError } from '../../Contexts/Bank/Shared/domain/ValueObject/InvalidArgumentError';
import { Controller } from './Controller';

type CreateAccountRequest = Request & {
  body: {
    accountId: string;
  };
};

export class CreateAccountPostController implements Controller {
  constructor(private readonly accountCreator: AccountCreator) {}

  async run(req: CreateAccountRequest, res: Response) {
    try {
      await this.accountCreator.create(req.body.accountId);

      res.status(httpStatus.CREATED).send();
    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).json({ error: err.message });
      }

      if (err instanceof AccountAlreadyExistsError) {
        res.status(httpStatus.CONFLICT).json({ error: err.message });
      }
    }
  }
}
