import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const getJwtConfig = (): JwtModuleAsyncOptions => ({
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET')
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
})
