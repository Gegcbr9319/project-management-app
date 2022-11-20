import { User } from './User';

export type NewUserDto = Omit<User, '_id'>;
