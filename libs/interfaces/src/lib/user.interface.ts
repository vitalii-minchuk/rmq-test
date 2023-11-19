export enum UserRoleEnum {
  TEACHER = 'Teacher',
  STUDENT = 'Student',
}

export interface IUser {
  _id?: string
  displayName?: string
  email: string
  passwordHash?: string
  role: UserRoleEnum
}
