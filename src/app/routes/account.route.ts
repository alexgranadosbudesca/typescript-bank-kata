import { Express } from 'express';
import { AccountDepositPostController } from '../controllers/Account/AccountDepositPostController';
import { AccountTransferPostController } from '../controllers/Account/AccountTransferPostController';
import { AccountWithdrawPostController } from '../controllers/Account/AccountWithdrawPostController';
import { CreateAccountPostController } from '../controllers/Account/CreateAccountPostController';
import container from '../dependency-injection';

export const register = (app: Express) => {
  const createAccountPostController: CreateAccountPostController = container.get(
    'App.controller.CreateAccountPostController',
  );
  const depositPostController: AccountDepositPostController = container.get(
    'App.controller.AccountDepositPostController',
  );
  const transferPostController: AccountTransferPostController = container.get(
    'App.controller.AccountTransferPostController',
  );
  const withdrawPostController: AccountWithdrawPostController = container.get(
    'App.controller.AccountWithdrawPostController',
  );

  app.post('/account', createAccountPostController.run.bind(createAccountPostController));
  app.post('/account/deposit', depositPostController.run.bind(depositPostController));
  app.post('/account/transfer', transferPostController.run.bind(transferPostController));
  app.post('/account/withdraw', withdrawPostController.run.bind(withdrawPostController));
};
