import { Subscription } from '../entities/subscription';
import { IEmailService } from './interfaces/email-service';
import { ISubscriptionDataSource } from './interfaces/subscription-data-source';

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

    const persistedSubscription = await dataSource.save(subscription);

    const notificationResult
      = await emailService.notifyAboutSubscription(persistedSubscription);

    if (!notificationResult) {
      await dataSource.removeById(persistedSubscription.id!);

      return Promise.reject(UnreachableEmailAddress);
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

export class UnreachableEmailAddress extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, UnreachableEmailAddress.prototype);
  }
}
