import { getMongoConnectionString } from '@project/util/util-core';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('application.db.user'),
          password: config.get<string>('application.db.password'),
          host: config.get<string>('application.db.host'),
          port: config.get<string>('application.db.port'),
          authDatabase: config.get<string>('application.db.authBase'),
          databaseName: config.get<string>('application.db.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}