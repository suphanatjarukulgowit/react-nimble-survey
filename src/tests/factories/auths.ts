import { faker } from '@faker-js/faker';

import { Auths, TokenType } from 'types/auth';

const buildAuths = (attrs?: Partial<Auths>): Auths => {
  return {
    tokenType: TokenType.Bearer,
    accessToken: `access_token_${faker.datatype.number()}`,
    refreshToken: `refresh_token_${faker.datatype.number()}`,
    createdAt: 1675576881,
    expiresIn: 7200,
    ...attrs,
  };
};

export { buildAuths };
