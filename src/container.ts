import {
  AddSubcription,
  createAddSubscriptionUseCase
} from './use-cases/add-subscription';
import {
  createDeleteSubscriptionUseCase,
  DeleteSubscription
} from './use-cases/delete-subscription';
import {
  mongoDbSubscriptionDataSource
} from './infra/database/mongodb/mongodb-subscription-data-source';
import './infra/database/mongodb/mongodb-loader';
import { sendgridEmailService } from './infra/email-service/sendgrid/sendgrid-email-service';

export const addSubscriptionUseCase: AddSubcription = createAddSubscriptionUseCase(
  mongoDbSubscriptionDataSource,
  sendgridEmailService
);

export const deleteSubscriptionUseCase: DeleteSubscription
  = createDeleteSubscriptionUseCase(
    mongoDbSubscriptionDataSource
  );
