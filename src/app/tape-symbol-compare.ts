import { TapeSymbol } from './tape-symbol';

export class TapeSymbolCompare {

  public compare(firstSymbol: TapeSymbol, secondSymbol: TapeSymbol): boolean {
    if (firstSymbol.value === TapeSymbol.ANY
      && (secondSymbol.value === TapeSymbol.ONE || secondSymbol.value === TapeSymbol.ZERO
        || secondSymbol.value === TapeSymbol.SCHWA || secondSymbol.value === TapeSymbol.X)) {
      return true;
    }
    if (secondSymbol.value === TapeSymbol.ANY
      && (firstSymbol.value === TapeSymbol.ONE || firstSymbol.value === TapeSymbol.ZERO
        || firstSymbol.value === TapeSymbol.SCHWA || firstSymbol.value === TapeSymbol.X)) {
      return true;
    }
    return firstSymbol.value === secondSymbol.value;
  }

}
