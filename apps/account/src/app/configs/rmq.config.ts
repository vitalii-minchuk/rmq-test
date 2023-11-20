import { ConfigModule, ConfigService } from "@nestjs/config";
import { IRMQServiceAsyncOptions } from "nestjs-rmq";

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
    connections: [
      {
        login: configService.get('AMQP_LOGIN') ?? '',
        password: configService.get('AMQP_PASSWORD') ?? '',
        host: configService.get('AMQP_HOST') ?? ''
      }
    ],
    queueName: configService.get('AMQP_QUEUE'),
    prefetchCount: 16,
    serviceName: 'account',
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
})
