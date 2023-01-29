import { Auths, TokenType } from 'types/auth';

export const mockTokens: Auths = {
  tokenType: TokenType.Bearer,
  accessToken: 'access_token_12345',
  refreshToken: 'refresh_token_12345',
  createdAt: 1674654665,
  expiresIn: 7200,
};
