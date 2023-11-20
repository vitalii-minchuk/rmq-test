import { ConfigModuleOptions } from "@nestjs/config";

export const getEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  envFilePath: 'envs/.account.env'
})
