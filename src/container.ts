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
  mongoDbSubscriptionDataSource
} from './infra/database/mongodb/mongodb-subscription-data-source';
import './infra/database/mongodb/mongodb-loader';

export const addSubscriptionUseCase: AddSubcription = createAddSubscriptionUseCase(
  mongoDbSubscriptionDataSource,
  createInMemoryEmailService()
);

export const deleteSubscriptionUseCase: DeleteSubscription
  = createDeleteSubscriptionUseCase(
    mongoDbSubscriptionDataSource
  );
