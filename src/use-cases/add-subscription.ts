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
      return Promise.reject(new EmailAlreadyExists());
    }

    const subscription = Subscription.create({ email });

    const persistedSubscription = await dataSource.save(subscription);

    // @TODO
    // This could be handled as a domain event, or at least work in non-blocking way.
    const notificationResult
      = await emailService.notifyAboutSubscription(persistedSubscription);

    if (!notificationResult) {
      await dataSource.removeById(persistedSubscription.id!);

      return Promise.reject(new UnreachableEmailAddress());
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
