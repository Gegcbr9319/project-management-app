import jwt_decode from 'jwt-decode';

export interface IDecodedToken {
  id: string;
  login: string;
  exp: number;
  iat: number;
}

export interface IToken {
  timeout: ReturnType<typeof setTimeout>;
  time: number;
  value: string;
  decoded: IDecodedToken | null;
  isValid: boolean;
}

export class Token extends String implements IToken {
  timeout: ReturnType<typeof setTimeout>;
  time: number;
  value: string;
  decoded: IDecodedToken | null;
  isValid: boolean;

  constructor(token?: string) {
    super(token);
    this.value = token ? token : localStorage.getItem('token') || '';
    this.value && localStorage.setItem('token', this.value);
    try {
      this.decoded = jwt_decode(this.value);
    } catch {
      this.decoded = {
        id: '',
        login: '',
        exp: 0,
        iat: 0,
      };
    }
    this.time = !this.decoded
      ? 0
      : Math.floor((this.decoded.exp - new Date().valueOf() / 1000) * 1000);
    this.isValid = !this.decoded
      ? false
      : this.decoded.exp > this.decoded.iat &&
        this.decoded.exp > new Date().valueOf() / 1000 &&
        this.decoded.iat < new Date().valueOf() / 1000;
    this.timeout = setTimeout(() => clearTimeout(this.timeout), 0);
  }
}
