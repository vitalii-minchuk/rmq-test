import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repositories';
import { UserEntity } from '../user/entities/user.entity';
import { UserRoleEnum } from '@rmq-test/interfaces';
import { JwtService } from '@nestjs/jwt';

class RegisterDto {
  email: string
  password: string
  displayName?: string
  role: UserRoleEnum
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({email,password, displayName}: RegisterDto) {
    const existingUser = await this.userRepository.findUser(email)

    if (existingUser) {
      throw new Error('User with such email already registered')
    }

    const newUserEntity = await new UserEntity({
      displayName,
      email,
      role: UserRoleEnum.STUDENT,
    }).setPassword(password)

    const newUser = await this.userRepository.createUser(newUserEntity)

    return {email: newUser.email}
  }

  async validateUser(email: string, password: string) {
    const existingUser = await this.userRepository.findUser(email)

    if (!existingUser) {
      throw new Error('wrong password or email')
    }
    const userEntity = new UserEntity(existingUser)
    const isPasswordCorrect = await userEntity.validatePassword(password)

    if (!isPasswordCorrect) {
      throw new Error('wrong password or email')
    }

    return { id: existingUser._id }
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id })
    }
  }
}
