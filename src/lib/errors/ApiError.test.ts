import { AxiosResponse } from 'axios';

import ApiError from './ApiErrors';

const mockAxiosResponse: AxiosResponse = {
  config: {},
  status: 400,
  statusText: '',
  headers: { 'content-type': 'application/json' },
  data: {
    errors: [
      {
        code: 'internal_error',
        detail: 'Something went wrong. Please try again.',
      },
    ],
  },
};

describe('ApiError', () => {
  it('initializes the ApiError instance', () => {
    const apiError = new ApiError(mockAxiosResponse);

    expect(apiError.status).toBe(mockAxiosResponse.status);
    expect(apiError.headers).toBe(mockAxiosResponse.headers);
    expect(apiError.errors).toBe(mockAxiosResponse.data.errors);
  });

  describe('.toArrayString()', () => {
    describe('given there is only one error', () => {
      it('returns an error message', () => {
        const axiosResponse = {
          ...mockAxiosResponse,
          data: {
            errors: [
              {
                code: 'invalid_email_or_password',
                detail: 'Your email or password is incorrect. Please try again.',
              },
            ],
          },
        };

        const apiError = new ApiError(axiosResponse);
        expect(apiError.toArrayString()[0]).toBe('Your email or password is incorrect. Please try again.');
      });
    });

    describe('given there are multiple errors', () => {
      it('joins all error messages and returns the message', () => {
        const axiosResponse = {
          ...mockAxiosResponse,
          data: {
            errors: [
              {
                code: 'invalid_email',
                detail: 'Your email cannot be blank',
              },
              {
                code: 'invalid_password',
                detail: 'Your password cannot be blank',
              },
            ],
          },
        };

        const apiError = new ApiError(axiosResponse);

        expect(apiError.toArrayString().join(',')).toBe('Your email cannot be blank,Your password cannot be blank');
      });
    });
  });
});
