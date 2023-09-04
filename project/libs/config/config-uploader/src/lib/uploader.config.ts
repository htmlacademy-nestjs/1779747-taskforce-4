import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const DEFAULT_MONGO_PORT = 27017;

export interface UploaderConfig {
  environment: string;
  uploadDirectory: string;
  port: number;
   db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  }
}

export default registerAs('application', (): UploaderConfig => {
  const config: UploaderConfig = {
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: parseInt(process.env.POR || DEFAULT_PORT.toString(), 10),
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    }
  };

  const validationSchema = Joi.object<UploaderConfig>({
    environment: Joi.string()
      .valid('development', 'production', 'stage'),
    port: Joi.number()
      .port()
      .default(DEFAULT_PORT),
      uploadDirectory: Joi.string(),
      db: Joi.object({
        host: Joi.string().valid().hostname(),
        port: Joi.number().port(),
        name: Joi.string().required(),
        user: Joi.string().required(),
        password: Joi.string().required(),
        authBase: Joi.string().required(),
      })
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Uploader Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});