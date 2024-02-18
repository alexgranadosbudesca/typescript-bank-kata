import { Nullable } from '../../Shared/domain/Nullable';
import { Account } from './Account';
import { AccountId } from './AccountId';

export interface AccountRepository {
  search(accountId: AccountId): Promise<Nullable<Account>>;

  save(account: Account): Promise<void>;
}
