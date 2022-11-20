export interface AuthToken {
  token: string;
}

export interface TokenContent {
  id: string;
  login: string;
  iat: Date; // issued
  exp: Date; // expires
}
