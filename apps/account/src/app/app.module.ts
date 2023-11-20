import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';
import { getRMQConfig } from './configs/rmq.config';
import { getEnvConfig } from './configs/env.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(getEnvConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
    RMQModule.forRootAsync(getRMQConfig())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
