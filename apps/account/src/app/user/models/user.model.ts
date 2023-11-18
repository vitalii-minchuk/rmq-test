import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser, UserRoleEnum } from '@rmq-test/interfaces';
import { Document } from 'mongoose';

@Schema()
export class User extends Document implements IUser {
  @Prop()
  displayName: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  passwordHash: string;

  @Prop({required: true, enum: UserRoleEnum, type: String, default: UserRoleEnum.STUDENT})
  role: UserRoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User)
