import { IUser, UserRoleEnum } from "@rmq-test/interfaces";
import { compare, genSalt, hash } from "bcryptjs";

export class UserEntity implements IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRoleEnum;

  constructor(user: IUser) {
    this._id = user._id,
    this.displayName = user.displayName,
    this.email = user.email,
    this.role = user.role
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10)
    this.passwordHash = await hash(password, salt)
    return this
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash)
  }
}
