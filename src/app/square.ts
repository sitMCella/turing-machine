import { TapeSymbol } from './tape-symbol';

export class Square {
  public id: number;
  public value: TapeSymbol;

  constructor(id: number, value: TapeSymbol) {
    this.id = id;
    this.value = value;
  }
}
