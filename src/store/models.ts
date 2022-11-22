import { IToken } from 'store';

export interface IStore {
  managerAppApi: unknown;
  token: IToken;
}
