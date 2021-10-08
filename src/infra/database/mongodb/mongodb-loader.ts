import mongoose from 'mongoose';
import { config } from '../../../config/config';

mongoose.connect(`mongodb://${config.mongo.connectionQuery}`);
