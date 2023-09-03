import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;

export interface UploaderConfig {
  environment: string;
  uploadDirectory: string;
  port: number;
}

export default registerAs('application', (): UploaderConfig => {
  const config: UploaderConfig = {
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: parseInt(process.env.POR || DEFAULT_PORT.toString(), 10),
  };

  const validationSchema = Joi.object<UploaderConfig>({
    environment: Joi.string()
      .valid('development', 'production', 'stage'),
    port: Joi.number()
      .port()
      .default(DEFAULT_PORT),
    uploadDirectory: Joi.string()
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