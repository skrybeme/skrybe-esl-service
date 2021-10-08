import { Subscription } from '../../../../entities/subscription';
import {
  SubscriptionMongoDbDocument,
  SubscriptionMongoDbModel
} from '../models/subscription-mongodb-model';

export class SubscriptionMap {
  static toDomain(mongoDbModel: SubscriptionMongoDbDocument): Subscription {
    return Subscription.create({
      email: mongoDbModel.email,
      token: mongoDbModel.token
    }, mongoDbModel.id);
  }

  static toMongoDbDocument(domainModel: Subscription): SubscriptionMongoDbDocument {
    return new SubscriptionMongoDbModel({
      email: domainModel.email,
      id: domainModel.id,
      token: domainModel.token
    });
  }
}
