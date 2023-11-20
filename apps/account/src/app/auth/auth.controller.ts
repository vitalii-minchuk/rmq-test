import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRoleEnum } from '@rmq-test/interfaces';
import { AccountLogin } from '@rmq-test/contracts';

class RegisterDto {
  email: string
  password: string
  displayName?: string
  role: UserRoleEnum
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('login')
  async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { id } = await this.authService.validateUser(email, password)

    return this.authService.login(id)
  }
}

