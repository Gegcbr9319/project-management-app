export interface IDecodedToken {
  id: string;
  login: string;
  exp: number;
  iat: number;
}

export class Token {
  static #date = () => new Date().valueOf() / 1000;
  #interval?: ReturnType<typeof setInterval>;
  #decoded: IDecodedToken | null;
  #isValid: boolean;
  #value: string;
  #login: string;
  #id: string;

  constructor(token?: string) {
    this.#value = token ? token : localStorage.getItem('token') || '';
    try {
      this.#decoded = JSON.parse(Buffer.from(this.#value.split('.')[1], 'base64').toString());
    } catch {
      this.#decoded = null;
    }
    this.#login = this.#decoded?.login || '';
    this.#id = this.#decoded?.id || '';
    this.#isValid = this.#setIsValid();
    this.#interval = setInterval(() => {
      this.#isValid = this.#setIsValid();
      if (!this.#isValid) {
        clearInterval(this.#interval);
        localStorage.removeItem('token');
        this.#decoded = null;
        this.#value = '';
        this.#login = '';
        this.#id = '';
      }
    }, 1000);
  }

  #setIsValid() {
    if (!this.#decoded) return false;
    return (
      this.#decoded.exp > this.#decoded.iat &&
      this.#decoded.exp > Token.#date() &&
      this.#decoded.iat < Token.#date()
    );
  }

  get value() {
    let value;
    if (this.#value) value = this.#value;
    return value;
  }

  get login() {
    let login;
    if (this.#login) login = this.#login;
    return login;
  }

  get id() {
    let id;
    if (this.#id) id = this.#id;
    return id;
  }

  get isValid() {
    let isValid;
    if (this.#isValid) isValid = this.#isValid;
    return isValid;
  }
}
