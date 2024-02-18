import 'dotenv/config';
import MongoConfig from './MongoConfig';

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: process.env.MONGO_URL || '',
    };
  }
}
