import { Subscription } from '../../../src/entities/subscription';
import { internet } from 'faker';
import {
  createDeleteSubscriptionUseCase,
  SubscriptionTokenNotFound
} from '../../../src/use-cases/delete-subscription';
import {
  createInMemorySubscriptionDataSource
} from '../../mocks/in-memory-subscription-data-source';

describe('DeleteSubscription', () => {
  describe('happy path', () => {
    it('removes corresponding subscription from repository', async () => {
      const subscription = Subscription.create({ email: internet.email() });
      const inMemoryDataSource = createInMemorySubscriptionDataSource();

      inMemoryDataSource.save(subscription);

      const deleteSubscription = createDeleteSubscriptionUseCase(inMemoryDataSource);

      await deleteSubscription(subscription.token);

      expect(inMemoryDataSource.subscription()).toBeNull();
    });
  });

  describe('error paths', () => {
    describe('subscription with given token has not been found', () => {
      it('rejects with SubscriptionTokenNotFound error', async () => {
        const inMemoryDataSource = createInMemorySubscriptionDataSource();
        const subscription = Subscription.create({ email: internet.email() });

        const persistedSubscription = await inMemoryDataSource.save(subscription);

        const deleteSubscription = createDeleteSubscriptionUseCase(inMemoryDataSource);

        await expect(deleteSubscription('invalid-token'))
          .rejects
          .toEqual(SubscriptionTokenNotFound);

        expect(inMemoryDataSource.subscription()).toEqual(persistedSubscription);
      });
    });
  });
});
