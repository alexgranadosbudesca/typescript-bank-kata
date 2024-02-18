import { Nullable } from '../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../Shared/infrastructure/Persistence/MongoRepository';
import { Account } from '../../domain/Account';
import { AccountId } from '../../domain/AccountId';
import { AccountRepository } from '../../domain/AccountRepository';

interface AccountDocument {
  _id: string;
  statement: string;
  balance: number;
}

export class MongoAccountRepository extends MongoRepository<Account> implements AccountRepository {
  protected collectionName(): string {
    return 'accounts';
  }

  public async search(id: AccountId): Promise<Nullable<Account>> {
    const collection = await this.collection();
    const document = await collection.findOne<AccountDocument>({
      _id: id.value,
    });

    return document
      ? Account.fromPrimitives({
          id: id.value,
          transactions: document.statement,
          balance: document.balance,
        })
      : null;
  }

  public async save(account: Account): Promise<void> {
    return this.persist(account.id.value, account);
  }
}
