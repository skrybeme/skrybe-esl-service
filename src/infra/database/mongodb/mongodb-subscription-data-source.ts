import { Nullable } from '../../../common/types';
import { Subscription } from '../../../entities/subscription';
import { 
  ISubscriptionDataSource
} from '../../../use-cases/interfaces/subscription-data-source';
import { SubscriptionMap } from './mappers/subscription-map';
import { SubscriptionMongoDbModel } from './models/subscription-mongodb-model';

class MongoDbSubscriptionDataSource implements ISubscriptionDataSource {
  async findByEmail(email: string): Promise<Nullable<Subscription>> {
    const record = await SubscriptionMongoDbModel.findOne({ email });

    if (!record) {
      return Promise.resolve(null);
    }

    return Promise.resolve(SubscriptionMap.toDomain(record));
  }

  async removeById(id: string): Promise<Nullable<Subscription>> {
    const record = await SubscriptionMongoDbModel.findOneAndDelete({ id });

    if (!record) {
      return Promise.resolve(null);
    }

    return Promise.resolve(SubscriptionMap.toDomain(record));
  }

  async removeByToken(token: string): Promise<Nullable<Subscription>> {
    const record = await SubscriptionMongoDbModel.findOneAndDelete({ token });

    if (!record) {
      return Promise.resolve(null);
    }

    return Promise.resolve(SubscriptionMap.toDomain(record));
  }

  async save(subscription: Subscription): Promise<Subscription> {
    const mongoDbDocument = SubscriptionMap.toMongoDbDocument(subscription);

    const record = await SubscriptionMongoDbModel.create(mongoDbDocument);

    return Promise.resolve(SubscriptionMap.toDomain(record));
  }
}

export const mongoDbSubscriptionDataSource = new MongoDbSubscriptionDataSource();
