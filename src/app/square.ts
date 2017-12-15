import { TapeSymbol } from './tape-symbol';

export class Square {
  public id: number;
  public symbol: TapeSymbol;

  constructor(id: number, symbol: TapeSymbol) {
    this.id = id;
    this.symbol = symbol;
  }
}
