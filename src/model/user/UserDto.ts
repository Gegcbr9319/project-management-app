import { User } from './User';

export type UserDto = Pick<User, '_id' | 'name' | 'login'>;
