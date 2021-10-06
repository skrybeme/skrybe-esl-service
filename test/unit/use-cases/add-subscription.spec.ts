import { internet } from 'faker';
import { Subscription } from '../../../src/entities/subscription';
import {
  createAddSubscriptionUseCase,
  EmailAlreadyExists,
  UnreachableEmailAddress,
} from '../../../src/use-cases/add-subscription';
import { createInMemoryEmailService } from '../../mocks/in-memory-email-service';
import {
  createInMemorySubscriptionDataSource
} from '../../mocks/in-memory-subscription-data-source';

describe('AddSubscription', () => {
  describe('happy path', () => {
    const inMemoryDataSource = createInMemorySubscriptionDataSource();
    const inMemoryEmailService = createInMemoryEmailService();

    const addSubscription = createAddSubscriptionUseCase(
      inMemoryDataSource,
      inMemoryEmailService
    );

    jest.spyOn(inMemoryEmailService, "notifyAboutSubscription");

    const email = internet.email();

    it('saves new record to repository', async () => {
      await addSubscription(email);

      expect(inMemoryDataSource.subscription()?.email).toEqual(email);
    });

    it('notifies the subscriber with an email', () => {
      expect(inMemoryEmailService.notifyAboutSubscription)
        .toBeCalledWith(inMemoryDataSource.subscription());
    });
  });

  describe('error paths', () => {
    describe('subscription already exists in data source', () => {
      const email = internet.email();

      const inMemoryDataSource = createInMemorySubscriptionDataSource({
        findByEmail: async (_: string) => {
          return Promise.resolve(Subscription.create({ email }));
        }
      });

      const addSubscription = createAddSubscriptionUseCase(
        inMemoryDataSource,
        createInMemoryEmailService()
      );

      it('rejects with EmailAlreadyExists error', async () => {
        await expect(addSubscription(email)).rejects.toEqual(EmailAlreadyExists);
      });
    });

    describe('email service error on email sending', () => {
      const email = internet.email();

      const inMemoryDataSource = createInMemorySubscriptionDataSource();

      const addSubscription = createAddSubscriptionUseCase(
        inMemoryDataSource,
        createInMemoryEmailService({
          notifyAboutSubscription: async () => Promise.resolve(false)
        })
      );

      it('rejects with UnreachableEmailAddress error', async () => {
        await expect(addSubscription(email)).rejects.toEqual(UnreachableEmailAddress);
      });

      it('deletes subscription (record) from repository', () => {
        expect(inMemoryDataSource.subscription()).toBeNull();
      });
    });
  });
});
