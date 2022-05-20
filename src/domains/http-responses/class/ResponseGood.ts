import { IResponseGood } from '../interfaces';

export abstract class ResponseGood<T> {
  protected _code: number;
  protected _data: T;

  constructor(code: number, data: T) {
    this._code = code;
    this._data = data;
  }

  abstract get reponse(): IResponseGood<T>;
}
