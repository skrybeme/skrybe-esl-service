import { datatype, internet } from 'faker';
import { Subscription } from '../../../src/entities/subscription';
import {
  createAddSubscriptionUseCase,
  DataSourceFailure,
  EmailAlreadyExists,
  IEmailService,
  ISubscriptionDataSource
} from '../../../src/use-cases/add-subscription';

interface InMemoryDataSourceFactoryProps {
  findByEmailImplementation?: ISubscriptionDataSource['findByEmail'];
}

const createInMemoryDataSource: (props?: InMemoryDataSourceFactoryProps) => ISubscriptionDataSource & { subscription: () => Subscription }
  = (props) => {
    let _subscription: Subscription;

    return {
      findByEmail: props?.findByEmailImplementation
        ? props.findByEmailImplementation
        : async (_: string) => {
          return Promise.resolve(null);
        },
      removeById: async (_: string) => {
        return Promise.resolve(true);
      },
      save: async (subscription: Subscription) => {
        _subscription = Subscription.create({ email: subscription.email }, datatype.uuid());

        return Promise.resolve(_subscription);
      },
      subscription: () => _subscription
    }
  }

const createInMemoryEmailService: () => IEmailService = () => {
  return {
    notifyAboutSubscription: (_: Subscription) => {
      return Promise.resolve(true);
    }
  }
}

describe('AddSubscription', () => {
  describe('happy path', () => {
    const inMemoryDataSource = createInMemoryDataSource();
    const inMemoryEmailService = createInMemoryEmailService();

    const addSubscription = createAddSubscriptionUseCase(
      inMemoryDataSource,
      inMemoryEmailService
    );

    jest.spyOn(inMemoryEmailService, "notifyAboutSubscription");

    const email = internet.email();

    it('saves new record to repository', async () => {
      await addSubscription(email);

      expect(inMemoryDataSource.subscription().email).toEqual(email);
    });

    it('notifies the subscriber with an email', () => {
      expect(inMemoryEmailService.notifyAboutSubscription)
        .toBeCalledWith(inMemoryDataSource.subscription());
    });
  });

  describe('error paths', () => {
    describe('subscription already exists in data source', () => {
      const email = internet.email();

      const inMemoryDataSource = createInMemoryDataSource({
        findByEmailImplementation: async (_: string) => {
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
  });

  describe('infra failures', () => {
    describe('data source error on record fetching', () => {
      it.todo('rejects with DataSourceFailure error');
    });

    describe('data source error on record persisting', () => {
      it.todo('rejects with DataSourceFailure error');
    });

    describe('email service error on email sending', () => {
      it.todo('rejects with EmailServiceFailure error');

      it.todo('deletes subscription (record) from repository');

      describe('data source error on record deletion', () => {
        it.todo('rejects with EmailServiceAndDataSourceFailure error');
      });
    });
  });
});
