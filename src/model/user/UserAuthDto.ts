import { User } from './User';

export type UserAuthDto = Pick<User, 'login' | 'password'>;
