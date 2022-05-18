export interface IResponseError {
  code: number;
  data: {
    message: {
      error: string;
    };
  };
}
