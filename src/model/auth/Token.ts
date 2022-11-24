import jwtDecode from 'jwt-decode';
import { string } from 'yargs';

export interface IToken {
  encoded: string;
  decoded: IDecodedToken | null;
  isValid: boolean;
  timeLeft: number;
  timeout?: ReturnType<typeof window.setTimeout>;
}

export interface IDecodedToken {
  id: string;
  login: string;
  exp: Date;
  iat: Date;
}

export interface TokenDto {
  token: string;
}

export class Token implements IToken {
  encoded: string;
  decoded: IDecodedToken | null;
  timeout: ReturnType<typeof window.setTimeout> | undefined;

  constructor(token?: string) {
    this.encoded = token || '';
    this.decoded = jwtDecode(this.encoded);
  }

  get isValid(): boolean {
    return this.decoded ? +this.decoded.exp * 1000 > Date.now() : false;
  }

  get timeLeft(): number {
    return this.decoded ? +this.decoded.exp * 1000 - Date.now() : 0;
  }
}
