import jwtDecode from 'jwt-decode';

export interface IDecodedToken {
  id: string;
  login: string;
  exp: Date;
  iat: Date;
}

export interface TokenDto {
  token: string;
}

export interface AuthState {
  token: Token | null;
}

export type Timeout = ReturnType<typeof setTimeout>;

export class Token {
  encoded: string;
  decoded: IDecodedToken | null;
  timeout: Timeout | null = null;

  constructor(token: string) {
    this.encoded = token;
    this.decoded = jwtDecode(token);
  }

  get isValid(): boolean {
    return this.decoded ? +this.decoded.exp * 1000 > Date.now() : false;
  }

  get timeLeft(): number {
    return this.decoded ? +this.decoded.exp * 1000 - Date.now() : 0;
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  toJSON(): string {
    return this.encoded;
  }
}
