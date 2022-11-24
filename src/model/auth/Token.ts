import jwtDecode from 'jwt-decode';

export interface ISerializableToken {
  encoded: string;
  decoded: IDecodedToken | null;
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

export class Token {
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

  toJSON(): ISerializableToken {
    return {
      encoded: this.encoded,
      decoded: this.decoded,
    };
  }
}
