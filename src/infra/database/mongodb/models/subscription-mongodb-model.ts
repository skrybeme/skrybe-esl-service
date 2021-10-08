import { Document, model, Schema } from 'mongoose';

export interface SubscriptionMongoDbDocument extends Document {
  email: string;
  token: string
}

const SubscriptionMongoDbModelSchema = new Schema<SubscriptionMongoDbDocument>({
  email: {
    required: true,
    type: String,
    unique: true
  },
  token: {
    required: true,
    type: String
  }
});

export const SubscriptionMongoDbModel
  = model("SubscriptionMongoDbModel", SubscriptionMongoDbModelSchema);
