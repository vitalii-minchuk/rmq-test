import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.account.env'
    }),
    MongooseModule.forRootAsync(getMongoConfig())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
