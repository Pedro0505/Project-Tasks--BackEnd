import { ResponseGood } from './class';

export class Create<T> extends ResponseGood<T> {
  protected _code: number;
  protected _data: T;

  constructor(data: T) {
    super(201, data);
    this._code = 201;
    this._data = data;
  }

  get reponse() {
    return {
      code: this._code,
      data: this._data,
    };
  }
}
