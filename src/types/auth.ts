export const enum TokenType {
  Bearer = 'Bearer',
}

export type Auths = {
  tokenType: TokenType;
  accessToken: string;
  refreshToken: string;
  createdAt: number;
  expiresIn: number;
};
