import { Subscription } from '../entities/subscription';
import { ISubscriptionDataSource } from './interfaces/subscription-data-source';

export type DeleteSubscription = (token: string) => Promise<Subscription>;

export function createDeleteSubscriptionUseCase(
  dataSource: ISubscriptionDataSource
): DeleteSubscription {
  return async (token: string) => {
    const removedRecord = await dataSource.removeByToken(token);

    if (!removedRecord) {
      return Promise.reject(new SubscriptionTokenNotFound());
    }

    return Promise.resolve(removedRecord);
  };
}

export class SubscriptionTokenNotFound extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, SubscriptionTokenNotFound.prototype);
  }
}
