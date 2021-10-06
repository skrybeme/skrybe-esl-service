import {
  AddSubcription,
  createAddSubscriptionUseCase
} from './use-cases/add-subscription';
import {
  createDeleteSubscriptionUseCase,
  DeleteSubscription
} from './use-cases/delete-subscription';
import { createInMemoryEmailService } from '../test/mocks/in-memory-email-service';
import {
  createInMemorySubscriptionDataSource
} from '../test/mocks/in-memory-subscription-data-source';

export const addSubscriptionUseCase: AddSubcription = createAddSubscriptionUseCase(
  createInMemorySubscriptionDataSource(),
  createInMemoryEmailService()
);

export const deleteSubscriptionUseCase: DeleteSubscription
  = createDeleteSubscriptionUseCase(
    createInMemorySubscriptionDataSource()
  );
