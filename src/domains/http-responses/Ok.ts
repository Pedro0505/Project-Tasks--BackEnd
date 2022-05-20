import { ResponseGood } from './class';

export class Ok<T> extends ResponseGood<T> {
  protected _code: number;
  protected _data: T;

  constructor(data: T) {
    super(200, data);
    this._code = 200;
    this._data = data;
  }

  get reponse() {
    return {
      code: this._code,
      data: this._data,
    };
  }
}
