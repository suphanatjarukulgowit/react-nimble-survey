import { AxiosResponse } from 'axios';

class ApiError extends Error {
  public status: number;
  public error: any;

  constructor(response: AxiosResponse) {
    super(response.statusText);
    this.status = response.status;
    this.error = response.data.error;
  }
}

export default ApiError;
