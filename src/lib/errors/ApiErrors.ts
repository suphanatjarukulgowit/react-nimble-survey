import { AxiosResponse } from 'axios';

class ApiError extends Error {
  public status: number;
  headers: { [key: string]: string };
  errors: [{ code: string; detail: string }];

  constructor({ status, headers, data }: AxiosResponse) {
    super();
    this.name = 'Error';
    this.status = status;
    this.headers = headers;
    this.errors = data.errors;
  }

  toArrayString = (): string[] => {
    return this.errors.map(({ detail }) => detail);
  };
}

export default ApiError;
