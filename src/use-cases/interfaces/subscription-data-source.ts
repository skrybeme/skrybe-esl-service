import { AsyncNullable } from 'common/types';
import { Subscription } from 'entities/subscription';

export interface ISubscriptionDataSource {
  findByEmail: (email: string) => AsyncNullable<Subscription>;
  removeById: (id: string) => AsyncNullable<Subscription>;
  removeByToken: (id: string) => AsyncNullable<Subscription>;
  save: (subscription: Subscription) => Promise<Subscription>;
}
