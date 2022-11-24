import { User } from './User';

export type UpdateUserDto = Omit<User, 'name'> & Partial<Pick<User, 'name'>>;
