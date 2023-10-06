import { ConfigService } from '@nestjs/config';

const getMongoString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('DB_LOGIN') +
  ':' +
  configService.get('DB_PASSWORD') +
  '@' +
  configService.get('DB_HOST') +
  ':' +
  configService.get('DB_PORT') +
  '/' +
  configService.get('DB_AUTHDATABASE');

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const getMongoConfig = async (
  configService: ConfigService
): Promise<any> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};