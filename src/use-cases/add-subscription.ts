import { AsyncNullable, Nullable } from '../common/types';
import { Subscription } from '../entities/subscription';

export interface ISubscriptionDataSource {
  findByEmail: (email: string) => AsyncNullable<Subscription>;
  removeById: (id: string) => Promise<any>;
  save: (subscription: Subscription) => AsyncNullable<Subscription>;
}

export interface IEmailService {
  notifyAboutSubscription: (subscription: Subscription) => Promise<any>;
}

export type AddSubcription = (email: string) => Promise<Subscription>;

export function createAddSubscriptionUseCase(
  dataSource: ISubscriptionDataSource,
  emailService: IEmailService
): AddSubcription {
  return async (email: string) => {
    const record = await dataSource.findByEmail(email);

    if (record) {
      return Promise.reject(EmailAlreadyExists);
    }

    const subscription = Subscription.create({ email });

    let persistedSubscription: Nullable<Subscription>;

    try {
      persistedSubscription = await dataSource.save(subscription);
    } catch (e) {
      // @TODO Log error.
      return Promise.reject(DataSourceFailure);
    }

    if (!persistedSubscription || !persistedSubscription.id) {
      return Promise.reject(DataSourceFailure);
    }

    try {
      // @TODO This is a great action to call from an event (subscription added) listener.
      const notificationResult
        = await emailService.notifyAboutSubscription(persistedSubscription);

      if (!notificationResult) {
        await dataSource.removeById(persistedSubscription.id);

        return Promise.reject(EmailServiceFailure);
      }
    } catch (e) {
      // @TODO Log error.
      return Promise.reject(DataSourceFailure);
    }

    return Promise.resolve(persistedSubscription);
  };
}

export class EmailAlreadyExists extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, EmailAlreadyExists.prototype);
  }
}

export class DataSourceFailure extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, DataSourceFailure.prototype);
  }
}

export class EmailServiceFailure extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, EmailServiceFailure.prototype);
  }
}
