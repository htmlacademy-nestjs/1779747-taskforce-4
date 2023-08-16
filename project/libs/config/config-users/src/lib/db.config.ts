import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { DatabaseEnvironment } from './database-environment';
import { plainToInstance } from 'class-transformer';

const DEFAULT_MONGO_PORT = 27017;

export interface DbConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

export default registerAs('db', (): DbConfig => {
  const config: DbConfig = {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
    name: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  };

  const databaseEnvironment = plainToInstance(
    DatabaseEnvironment,
    config,
    { enableImplicitConversion: true }
  );

  const errors = validateSync(
    databaseEnvironment, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});