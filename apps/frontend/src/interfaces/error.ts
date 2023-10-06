export interface IKeyValuePair {
  field: string;
  // eslint-disable-next-line
  value: any;
}

export interface IOption {
  id: string;
  option: string;
}

export class HttpError extends Error {
  public statusCode: number;
  constructor(httpCode: number, message: string) {
    super(message);
    this.statusCode = httpCode;
  }
}
