export interface User {
  _id: string;
  name: string;
  login: string;
  password: string;
}

export type UserAuthDto = Pick<User, 'login' | 'password'>;

export type NewUserDto = Omit<User, '_id'>;

export type UpdateUserDto = Omit<User, 'name'> & Partial<Pick<User, 'name'>>;

export type UserDto = Pick<User, '_id' | 'name' | 'login'>;
