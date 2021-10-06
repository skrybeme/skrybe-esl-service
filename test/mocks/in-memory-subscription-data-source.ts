import { datatype } from 'faker';
import { Nullable } from '../../src/common/types';
import { Subscription } from '../../src/entities/subscription';
import { ISubscriptionDataSource } from '../../src/use-cases/interfaces/subscription-data-source';

export type InMemorySubscriptionDataSourceFactoryProps = Partial<ISubscriptionDataSource>

export type InMemorySubscriptionDataSourceFactory
  = (props?: InMemorySubscriptionDataSourceFactoryProps) => ISubscriptionDataSource & {
    subscription: () => Nullable<Subscription>;
  }

export const createInMemorySubscriptionDataSource: InMemorySubscriptionDataSourceFactory = (props) => {
  let _subscription: Nullable<Subscription>;

  return {
    findByEmail: props?.findByEmail || (async (_: string) => Promise.resolve(null)),
    removeById: props?.removeById || (async (id: string) => {
      if (_subscription?.id !== id) {
        return Promise.resolve(null);
      }

      const subscriptionMemo = _subscription;

      _subscription = null;

      return Promise.resolve(subscriptionMemo);
    }),
    removeByToken: props?.removeByToken || (async (token: string) => {
      if (_subscription?.token !== token) {
        return Promise.resolve(null);
      }

      const subscriptionMemo = _subscription;

      _subscription = null;

      return Promise.resolve(subscriptionMemo);
    }),
    save: props?.save || (async (subscription: Subscription) => {
      _subscription = Subscription.create({
        email: subscription.email,
        token: subscription.token
      }, datatype.uuid());

      return Promise.resolve(_subscription);
    }),
    subscription: () => _subscription
  };
}
