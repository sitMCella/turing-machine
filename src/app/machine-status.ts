import { Tape } from "./tape";
import { TapeSymbol } from "./tape-symbol";

export class MachineStatus {
  public configurationName: string;
  public tape: Tape;
  public index: number;

  constructor(configurationName: string, tape: Tape, index: number) {
    this.configurationName = configurationName;
    this.tape = tape;
    this.index = index;
  }

  public get symbol(): TapeSymbol {
    if (this.maxSquareCount()) {
      throw new Error(
        "Cannot read symbol on square with index " + (this.index + 1),
      );
    }
    return this.tape.squares[this.index].symbol;
  }

  public set symbol(symbol: TapeSymbol) {
    this.tape.squares[this.index].symbol = symbol;
  }

  public maxSquareCount(): boolean {
    return this.index >= this.tape.squares.length;
  }
}
