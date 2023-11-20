import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      uri: getMongoString(configService),
    }),
    inject: [ConfigService],
    imports: [ConfigModule]
  }
}

const getMongoString = (configService: ConfigService) => {
  return 'mongodb+srv://mcmintsch:' +
    configService.get('MONGO_PASSWORD') +
    '@cluster0.zryzdr2.mongodb.net/'
}
