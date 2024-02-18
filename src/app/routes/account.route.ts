import { Express } from 'express';
import { AccountDepositPostController } from '../controllers/AccountDepositPostController';
import { AccountTransferPostController } from '../controllers/AccountTransferPostController';
import { AccountWithdrawPostController } from '../controllers/AccountWithdrawPostController';
import { CreateAccountPostController } from '../controllers/CreateAccountPostController';
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

  app.post('/create', createAccountPostController.run.bind(createAccountPostController));
  app.post('/deposit', depositPostController.run.bind(depositPostController));
  app.post('/transfer', transferPostController.run.bind(transferPostController));
  app.post('/withdraw', withdrawPostController.run.bind(withdrawPostController));
};
