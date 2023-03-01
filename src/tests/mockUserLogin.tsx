import { LocalStorageKey } from 'lib/localStorage';
import { Auths, TokenType } from 'types/auth';
import { UserProfile } from 'types/userProfile';

export const mockTokens: Auths = {
  tokenType: TokenType.Bearer,
  accessToken: 'access_token_12345',
  refreshToken: 'refresh_token_12345',
  createdAt: 1674654665,
  expiresIn: 7200,
};

export const mockUser: UserProfile = {
  avatarUrl: 'https://secure.gravatar.com/avatar/4f8766bd709e1d5829fc34316491a2e5',
  email: 'suphanat@nimblehq.co',
  name: 'Team Nimble',
};

const mockTokensLoggedIn = () => {
  beforeEach(() => {
    localStorage.setItem(LocalStorageKey.auth, JSON.stringify(mockTokens));
  });

  return { tokens: mockTokens };
};

const mockUserLoggedIn = () => {
  beforeEach(() => {
    localStorage.setItem(LocalStorageKey.auth, JSON.stringify(mockTokens));
    localStorage.setItem(LocalStorageKey.userProfile, JSON.stringify(mockUser));
  });

  return { mockTokens, mockUser };
};

export { mockTokensLoggedIn, mockUserLoggedIn };
